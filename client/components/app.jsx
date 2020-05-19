import React from 'react';
import styled from 'styled-components';
import CompleteTheLook from './ctl.jsx';
import ProductDetail from './detail.jsx';
import { YouMayAlsoLike } from './ymal.jsx';
import Feedback from './feedback.jsx';

class App extends React.Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		return (
			<Container>
        <CompleteTheLook />
				<YouMayAlsoLike />
			</Container>
		);
	}
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
`;

export default App;
