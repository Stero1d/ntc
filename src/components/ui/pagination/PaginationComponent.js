import React, { Component } from 'react'
/*custom components*/
import { Grid, Form, Pagination, Segment } from 'semantic-ui-react'
/*css*/
import "./paginationComponent.css"


class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    handlePaginationChange = (e, { activePage }) => {
        this.props.onChange(activePage);
        console.log(activePage);
    };

    render() {
        let { activePage, boundaryRange, siblingRange, ellipsisItem, lastItem, nextItem, totalPages, firstItem, prevItem } = this.props;

        return (
            <div id="pagination">
                <Pagination
                    defaultActivePage={1}
                    activePage={activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={totalPages}
                    ellipsisItem={ellipsisItem || undefined}
                    firstItem={firstItem || undefined}
                    lastItem={lastItem || undefined}
                    prevItem={prevItem || undefined}
                    nextItem={nextItem || undefined}
                />
            </div>
        )
    }
}

export default (PaginationComponent)