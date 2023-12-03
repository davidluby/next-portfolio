import React, { useState, useEffect } from 'react';

import TextField from '@components/trends/TextField';

function DataControls({ figData, setFigData }) {
    // GET CURRENT DATE
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    // DATE AND DATA STATE
    const [date, setDate] = useState(yyyy + '-' + mm + '-' + dd);
    const [index, setIndex] = useState(null);
    const [yEntry, setYEntry] = useState(0);
    const [yyEntry, setYyEntry] = useState(0);
    
    const y_series = figData.y_series.data;

    useEffect(() => {
        for (let i = 0; i < y_series.length; i++) {
            if (date === y_series[i][0]) {
                setIndex(i);
                setYEntry(figData.y_series.data[i][1]);
                setYyEntry(figData.yy_series.data[i][1]);
                break
            } else {
                setIndex(null);
                setYEntry(0);
                setYyEntry(0);
            };
        };
    }, [date]);



    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            let new_data = figData[e.target.name]['data'].slice();
            new_data[index][1] = e.target.value;

            setFigData({
                ...figData,
                [e.target.name]: {
                    ...figData[e.target.name],
                    data: new_data
                }
            });
        };
    };


  return (
    <div className="border-2 flex flex-col w-full">
        <div className="border-2 border-yellow-500">
            <label htmlFor="start">Date: </label>
            <input className="bg-transparent"
                type="date"
                id="start"
                name="trip-start" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="2022-01-01"
                max={date} />
        </div>
        <div className="border-2 border-blue-500">
            <label htmlFor="y_entry">{figData.y_series.label + " "}</label>
            <input className="bg-transparent"
                id="y_entry"
                type="number"
                name="y_series"
                value={yEntry}
                onChange={(e) => setYEntry(e.target.value)}
                onKeyDown={handleSubmit}>
            </input>
        </div>
        <div className="border-2 border-yellow-500">
            <label htmlFor="yy_entry">{figData.yy_series.label + " "}</label>
            <input className="bg-transparent"
                id="yy_entry"
                type="number"
                name="yy_series"
                value={yyEntry}
                onChange={(e) => setYyEntry(e.target.value)}
                onKeyDown={handleSubmit}>
            </input>
        </div>
    </div>
  )
}

export default DataControls