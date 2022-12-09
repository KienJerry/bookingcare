import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    handleAddUser = () => {
        alert('click');
    }


    render() {
        return (
            <div className="users-container">
                <div className='title text-center'> Manage users with ReactJs</div>
                <div className='mx-1 px-3'>
                    <button onClick={() => this.handleAddUser()} className='btn btn-primary'> <i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Numerical Order</th>
                            <th>Email</th>
                            <th>FistName</th>
                            <th>LastName</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.arrUsers.length > 0 && this.state.arrUsers?.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.email}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
