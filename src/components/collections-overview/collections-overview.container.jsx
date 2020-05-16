import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { compose } from 'redux'

import CollectionOverview from "./collections-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import { selectIsCollectionfetching } from "../../redux/shop/shop.selectors";


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionfetching
})

const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionOverviewContainer;