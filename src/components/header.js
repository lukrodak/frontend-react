import React from 'react';

const Header = () => {
    return (
        <thead className="border-top-0">
        <tr>
            <th>Part number</th>
            <th>Total checked</th>
            <th>From this OK</th>
            <th>Reworked</th>
            <th>NOK</th>
            <th>Total OK</th>
            <th>Remarks</th>
        </tr>
        </thead>
    );
};

export default Header;