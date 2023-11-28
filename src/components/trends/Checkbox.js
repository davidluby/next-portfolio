import React from 'react'

function Checkbox({ data, setData, object, field }) {
    const handleChange = () => {
        setData({
            ...data,
            [object]: {
                ...data[object],
                [field]: !data[object][field]
            }
        });

        // if (data.y_on === false) {
        //     setData({
        //         ...data,
        //         y_series: {
        //             ...data['y_series'],
        //             show_data: false,
        //             show_ticks: false,
        //             show_label: false,
        //             show_tick_labels: false,
        //             show_ls: false,
        //             dashed: false,
        //         }
        //     })
        // } else if (data.yy_on === false) {
        //     setData({
        //         ...data,
        //         y_series: {
        //             ...data['yy_series'],
        //             show_data: false,
        //             show_ticks: false,
        //             show_label: false,
        //             show_tick_labels: false,
        //             show_ls: false,
        //             dashed: false,
        //         }
        //     })
        // }
    }

  return (
    <div className="flex items-center space-x-2">
        <input className="w-4 h-4 hover:cursor-pointer"
            id={object + field}
            type="checkbox"
            checked={data[object][field]}
            onChange={handleChange}/>
        <label htmlFor={object + field}
            className="hover:cursor-pointer">{field}</label>
    </div>
  )
}

export default Checkbox