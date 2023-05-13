import * as React from 'react';
import PropTypes from 'prop-types';
import clone from '../modules/clone';
import './Excel.css';

let dataLog = [];
let auxLog = [];
let isReplaying = false;
let replayID = null;

function replay() {
    isReplaying = true;
    let idx = 0;
    replayID = setInterval(() => {
        const [data, fn] = dataLog[idx];
        fn(data);
        auxLog[idx] &&
            auxLog[idx].forEach(log => {
                const [data, fn] = log;
                fn(data);
            });
        idx++;
        if (idx > dataLog.length - 1) {
            isReplaying = false;
            clearInterval(replayID);
            return;
        }
    }, 1000);
}

function useLoggedState(initialValue, isData) {
    const [state, setState] = React.useState(initialValue);

    React.useEffect(() => {
        if (isReplaying) {
            return;
        }

        if (isData) {
            dataLog.push([clone(state), setState]);
        } else {
            const idx = dataLog.length - 1;
            if (!auxLog[idx]) {
                auxLog[idx] = [];
            }
            auxLog[idx].push([state, setState]);
        }
    }, [state]);

    return [state, setState];
}

function Excel({headers, initialData}) {
    const [data, setData] = useLoggedState(initialData, true);
    const [sorting, setSorting] = useLoggedState({
        column: null,
        descending: false,
    });
    const [edit, setEdit] = useLoggedState(null);
    const [search, setSearch] = useLoggedState(false);
    const [preSearchData, setPreSearchData] = useLoggedState(null);

    // try replacing with useLayoutEffect()
    React.useEffect(() => {
        // uncomment when using useLayoutEffect()
        // document.getElementsByTagName('table')[0].width = '1024px'
        function keydownHandler(e) {
            if (e.altKey && e.shiftKey && e.keyCode === 82) {
                // ALT+SHIFT+R(eplay);
                replay();
            }
        }
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
            clearInterval(replayID);
            dataLog = [];
            auxLog = [];
        }
    }, []);

    function sort(e) {
        const column = e.target.cellIndex;
        const dataCopy = clone(data);
        const descending = sorting.column === column && !sorting.descending;
        dataCopy.sort((a, b) => {
            if (a[column] === b[column]) {
                return 0;
            }

            return descending
                ? a[column] < b[column]
                    ? 1
                    : -1
                : a[column] > b[column]
                    ? 1
                    : -1;
        });
        setData(dataCopy);
        setSorting({column, descending});
    }

    function showEditor(e) {
        setEdit({
            row: parseInt(e.target.parentNode.dataset.row, 10),
            column: e.target.cellIndex,
        });
    }

    function save(e) {
        e.preventDefault();
        const input = e.target.firstChild;
        const dataCopy = clone(data);
        dataCopy[edit.row][edit.column] = input.value;
        setEdit(null);
        setData(dataCopy);
    }

    function toggleSearch() {
        if (search) {
            setData(preSearchData);
            setSearch(false);
            setPreSearchData(null);
        } else {
            setPreSearchData(data);
            setSearch(true);
        }
    }

    function filter(e) {
        const needle = e.target.value.toLowerCase();
        if (!needle) {
            setData(preSearchData);
            return;
        }
        const idx = e.target.dataset.idx;
        const searchdata = preSearchData.filter((row) => {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        setData(searchdata);
    }

    const searchRow = !search ? null : (
        <tr onChange={filter}>
            {headers.map((_, idx) => (
                <td key={idx}>
                    <input type="text" data-idx={idx} />
                </td>
            ))

            }
        </tr>
    );

    return (
        <div className='Excel'>
            <div className='toolbar'>
                <button onClick={toggleSearch}>
                    {search ? 'Hide search': 'Show search'}
                </button>
            </div>
            <table>
                <thead onClick={sort}>
                    <tr>
                        {headers.map((title, idx) => {
                            if (sorting.column === idx) {
                                title += sorting.descending ? ' \u2191' : ' \u2193';
                            }
                            return <th key={idx}>{title}</th>
                        })
                        }
                    </tr>
                </thead>
                <tbody onDoubleClick={showEditor}>
                    {searchRow}
                    {data.map((row, rowidx) => (
                        <tr key={rowidx} data-row={rowidx}>
                            {row.map((cell, columnidx) => {
                                console.log(`Rendering ${rowidx}x${columnidx}`);
                                if (
                                    edit &&
                                    edit.row === rowidx &&
                                    edit.column === columnidx
                                ) {
                                    cell = (
                                        <form onSubmit={save}>
                                            <input type="text" defaultValue={cell} />
                                        </form>
                                    );
                                }
                                return <td key={columnidx}>{cell}</td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

Excel.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

// export 
export default Excel;
