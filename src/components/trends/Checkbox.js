import React from 'react'

function Checkbox({ data, setData, object, field }) {
    const handleChange = () => {
        setData({
            ...data,
            [object]: {
                ...data[object],
                [field]: !data[object][field]
            }
        })
    }

  return (
    <div className="flex items-center">
        <input id="checkbox" type="checkbox" onChange={handleChange} value={data[object][field]} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"></input>
        <label htmlFor="checkbox" className="ms-2 text-sm font-medium">{field}</label>
    </div>
  )
}

export default Checkbox