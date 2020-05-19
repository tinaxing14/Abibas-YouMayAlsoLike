import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class Layout extends React.Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		return (
			<div className={this.props.className}>
				<div className='ctl-title'>complete the look </div>
				<div className='content'>
					<div className='list-container'>
						<div className='card'>card 1</div>
						<div className='card'>card 2</div>
						<div className='card'>card 3</div>
					</div>
					<div className='mini-detail'>
						<div className='mini-image'>
							mini-image
						</div>
						<div className='purchase-container'>
							purchase-container
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const StyledLayout = styled(Layout)`
	display: flex;
	flex-direction: row;
	background-color: blue;
	width: 60%;

	> .ctl-title{
		background-color: red;
		flex: 1;
		min-height: 65px;
		margin-right: 35px;
	}

	> .content{
		border: solid;
		background-color: yellow;
		flex: 3;

		> .list-container{
			display: flex;
			border: solid;
			background-color: green;

			> .card{
				border: solid;
				background-color: white;										
				height: 48px;
				max-width: 65px;
				margin-right: 15px;
			}
		}

		> .mini-detail{
			border: solid;
			background-color: pink;
			padding-top: 20px;
			display: flex;

			> .mini-image{
				background-color: orange;
				height: 100px;
				margin-right: 20px;
			}

			> .purchase-container{
				background-color: darkblue;
			}
		}
	}


`;

export default StyledLayout;