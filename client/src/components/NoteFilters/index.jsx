import React from "react";

const NoteFilters = ({ textFilter, setTextFilter }) => {
    function updateTextFilter(e) {
        setTextFilter(e.target.value);
    }

    return <div className="note-filters">
       <label>Search:<input type="text" value={textFilter} onChange={updateTextFilter} /></label>
    </div>
}

export default NoteFilters