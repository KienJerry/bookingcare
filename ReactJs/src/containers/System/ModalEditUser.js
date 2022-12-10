import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    };

    componentDidMount() {
        const { currenUser } = this.props;
        if(currenUser && !_.isEmpty(currenUser)){
            this.setState({
                id:currenUser.id,
                email: currenUser.email,
                password: 'hardcode',
                firstName: currenUser.firstName,
                lastName: currenUser.lastName,
                address: currenUser.address,
            })
        }
    };

    handleOnChangeInput = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value;
        this.setState({
            ...copystate,
        })
    };

    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Điền thiếu thông tin trường: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let checkvalid = this.checkValidate();
        if (checkvalid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.props.toggleEditUserModal()}
                size='lg'
                centered
                className='modal-user'
            >
                <ModalHeader toggle={() => this.props.toggleEditUserModal()}>Edit a User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Name</label>
                            <input 
                            type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, 'email')} 
                            disabled
                            value={this.state.email}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input 
                            type="password" 
                            onChange={(event) => this.handleOnChangeInput(event, 'password')} 
                            disabled
                            value={this.state.password}></input>
                        </div>
                        <div className='input-container'>
                            <label>First Name</label>
                            <input 
                            type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                            value={this.state.firstName}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input 
                            type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                            value={this.state.lastName}></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input 
                            type="text" 
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            value={this.state.address}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleSaveUser()}>
                        Save User
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.props.toggleEditUserModal()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);