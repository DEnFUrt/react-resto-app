import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCard} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

class MenuPage extends Component {

    componentDidMount() {
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItem(this.props.match.params.id)
        .then(res => this.props.menuLoaded(res))
        .catch(err => this.props.menuError(err.message));
    }

    render() {

        const {menuItems, loading, addedToCard, errorState: {error, errorMessage}} = this.props;    

        if (error) {
            return <Error message={errorMessage} />
        }

        if (loading) {
            return <Spinner />
        }

        const items = menuItems.map(menuItem => {
            return <MenuListItem
                styleProps={{
                    "width": "50%",
                    "minWidth": "250px",
                    "margin": "auto",
                }}
                key={menuItem.id}
                menuItem={menuItem}
                details={menuItem.details}
                isOpenCard
                onBack={this.props.history.goBack}
                onAddToCart={() => addedToCard(menuItem.id)}
            /> 
        })

        return <View items={items} />
    }
};

const mapStateToProps = state => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        errorState: state.errorState,
    }
}

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCard
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuPage));

const View = ({items}) => {
    return (
        <ul className="menu__list">
            {items}  
        </ul>
    )
}
