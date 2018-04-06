import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

class Handle extends React.Component {
    constructor(props) {
        super(props);
        this.handle = SortableHandle(() =>
            <i className="large icon bars"></i>
        );
    }
    render() {
        return <this.handle />
    }
}

export default Handle;