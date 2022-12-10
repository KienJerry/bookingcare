import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFrom();
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    }

    getAllUserFrom = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    createNewUser = async (data) => {
        try {
            let res = await createNewUserService(data);
            if (res?.errCode !== 0) {
                alert(res.message);
            } else {
                await this.getAllUserFrom();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_USER');
            }
        } catch (e) {

        }
    }

    handleDeleteUser = async (data) => {
        try {
            let res = await deleteUserService(data.id);
            if (res?.errCode === 0) {
                await this.getAllUserFrom();
            } else {
                alert(res.message);
            }
        } catch (e) {

        }
    }

    handleEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: data
        });
    }

    doEditUser = async (data) => {
        try {
            let res = await editUserService(data);
            if (res?.errCode === 0){
                await this.getAllUserFrom();
                this.setState({
                    isOpenModalEditUser: false,
                })
            }else{
                alert(res?.message);
            }
        } catch (e) {

        }
    }

    render() {
        return (
            <div className="users-container">
                {this.state.isOpenModalUser &&
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleUserModal={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                }
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleEditUserModal={this.toggleEditUserModal}
                        currenUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'> Manage users with ReactJs</div>
                <div className='mx-1 px-3'>
                    <button onClick={() => this.toggleUserModal()} className='btn btn-primary'> <i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
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
                                            <button className='btn-edit' onClick={() => this.handleEditUser(value)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(value)} ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
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
