import React, { Component } from 'react';
import styled from 'styled-components';

const ctlMockData = [
	{productId: 'GK4878', image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/1f9c184518d744429907ab1b00ff959b_9366/GK4878_000_plp_model.jpg?sh=295&amp;strip=false&amp;sw=295', price: 35, sizes: ['XS', 'S', 'M', 'L', 'XL'], href: 'https://www.adidas.com/us/girls-are-awesome-t-shirt/GK4878.html', title: 'Girls Are Awesome T Shirt'},
	{productId: 'GJ7774', image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/0c7119a185264936b42aab9700ef0d3c_9366/GJ7774_01_laydown.jpg?sh=295&amp;strip=false&amp;sw=295', price: 70, sizes: ['XS', 'S', 'M', 'L', 'XL'], href: 'https://www.adidas.com/us/festivo-track-pants/GJ7774.html', title: 'Festivo Track Pants'},
	{productId: 'FM0675', image: 'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/3e4565d1b7c143a8a4b8ab120163b462_9366/FM0675_00_plp_standard.jpg?sh=295&amp;strip=false&amp;sw=295', price: 14, sizes: ['M'], href: 'https://www.adidas.com/us/trefoil-crew-socks-2-pairs/FM0675.html', title: 'Trefoil Crew Socks 2 Pairs'}
];

class CompleteTheLook extends Component{
	constructor(props){
		super(props);

		this.state = {
			products: ctlMockData,
			selectedIndex: undefined 
		};
	}

	selectItem(i){
		this.setState({selectedIndex: i});
	}

	render(){
		let miniDetailCard = this.state.selectedIndex !== undefined ? (<StyledDetailContainer product={this.state.products[this.state.selectedIndex]}/>) : '';

		return (
			<SubContainer>
				<h4>complete the look</h4>
				<div className="content_container">
					<ListContainer products={this.state.products} selectItem={this.selectItem.bind(this)} selectedIndex={this.state.selectedIndex}/>
					{miniDetailCard}
				</div>
			</SubContainer>
		);
	}
};

const SubContainer = styled.div`
    width: 60%;
	display: flex;
	flex-direction: row;
    justify-content: flex-start;
	margin-left: 40px;
    padding: 1em 0 0;
    margin-top: 20px;
    font-family: AdihausDIN,Helvetica,Arial,sans-serif;
    font-weight: 400;

	> h4{
	    flex: 1;
    	align-self: flex-start;
    	margin-right: 35px;
	    align-items: center;
	    min-height: 65px;
	    margin-bottom: 0;
    	line-height: 24px;
		font-family: AdineuePRO,Helvetica,Arial,sans-serif;
    	font-weight: 400;
	    font-size: 26px;
	    text-transform: uppercase;
	}

	> div.content_container{
		display: flex;
		flex: 2;
		flex-direction: column;
	}

	div.list_container{
		display: flex;
		justify-content: left;
		min-height: 140px;
	}
`;

class ListContainer extends Component{
	constructor(props){
		super(props);

		this.state = {};
	}

	render(){
		let index = 0;
		let cards = this.props.products.map(p => (<StyledProductCard selectItem={this.props.selectItem} index={index} key={index++} product={p} selectedIndex={this.props.selectedIndex}/>));

		return (
			<div className="list_container">
				{cards}
			</div>
		)
	}
}

const ProductCard = ({className, product, selectItem, index, selectedIndex}) => (
	<div className={className} onClick={()=>{selectItem(index);}}>
		<img src={product.image}/>
		<div className="price">
			<span>${product.price}</span>
		</div>
	</div>
);

const StyledProductCard = styled(ProductCard)`
	max-width: 90px;
	cursor: pointer;
    margin: 0 15px 0 0;

    ${
    	props => (props.index === props.selectedIndex) ? "border-bottom: 5px solid;" : ""
    };

    .price {
    	padding: 10px 0;
    }

    img {
    	width: 90px;
    	height: 90px;
    }
`;

class DetailContainer extends Component{
	constructor(props){
		super(props);

		this.state = {
			showSizeOption: false,
			selectedSizeIndex: undefined
		};
	}

	onSelectSizeClick(){
		if(this.state.showSizeOption){
			this.setState({showSizeOption: false});
		}else{
			this.setState({showSizeOption: true});
		}
	}

	selectSize(e){
		let index = e.target.getAttribute('index');
		let i = (index === this.state.selectedSizeIndex)? undefined : index;
		this.setState({selectedSizeIndex: i, showSizeOption: false});
	}

	render(){
		let product = this.props.product;
		let enabled = (this.state.selectedSizeIndex !== undefined);

		return(
			<div className={this.props.className}>
				<div className="product_image">
					<a href={product.href}>
						<img className="img_normal" src={product.image}/>
					</a>
				</div>
				<div className="purchase_container">
					<a target="_blank" href={product.href}>
						<h5>{product.title}</h5>
					</a>
					<div className="product_price">
						<span>${product.price}</span>
					</div>
					<div className="bottom_wrapper">
						<StyledSizeDropdown handleClick={this.onSelectSizeClick.bind(this)} sizes={product.sizes} showSizeOption={this.state.showSizeOption} selectSize={this.selectSize.bind(this)} selectedSizeIndex={this.state.selectedSizeIndex}/>
						<StyledAddToBagButton enabled={enabled}/>
					</div>
				</div>
			</div>
		);
	}
}

const StyledDetailContainer = styled(DetailContainer)`
	display: flex;
	flex-direction: row;
    padding-top: 20px;
    border-top: 1px solid #767677;

    a {
    	text-decoration: none;
    	color: inherit;
    }

    h5 {
    	margin: 0;
    	font-size: 20px;
    	line-height: 18px;
    	font-family: AdineuePRO,Helvetica,Arial,sans-serif;
	    font-style: normal;
	    font-weight: 600;
	    margin-bottom: 20px;
	    text-transform: uppercase;
	    padding: 0;
    }	

    .product_image {
    	flex: 4;
    	margin-right: 5%;
    	min-width: 200px;
    }

    .product_price {
    	padding-top: 20px;
    }

    .purchase_container {
    	flex: 5;
    	display: flex;
    	flex-direction: column;
    	align-content: flex-start;
    	margin-right: 30%;
    	min-width: 280px;
    }

	.bottom_wrapper {
		padding-top: 10px;
    }

    img {
    	width: 100%;
    }

    svg {
    	width: 24px;
    	height: 24px;
    }
`;

const AddToBagButton = ({className}) => (
	<div className={className}>
		<span>Add To Bag</span>
		<svg>
			<symbol id="arrow-right-long" viewBox="0 0 24 24"><path d="M17.59 7l5 5-5 5M0 12h22" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></path></symbol>
			<use href="#arrow-right-long"></use>
		</svg>
	</div>
);

const StyledAddToBagButton = styled(AddToBagButton)`
	margin-top: 10px;
	background-color: ${ props => props.enabled ? "#000" : "#767677"};
	color: #fff;
	transform: translate(-3px,-3px);
	text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: ${ props => props.enabled ? "pointer" : "not-allowed"};
    justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	height: 50px;
	align-items: center;
    display: inline-flex;
    line-height: 50px;
    min-height: 50px;
    padding: 0 21px;

    > span {
    	flex: 1 1 auto;
    }
`;

const SizeDropdown = ({className, sizes, showSizeOption, handleClick, selectSize, selectedSizeIndex}) => {
	let index = 0;
	let lists = sizes.map( s => {
		let selected = (selectedSizeIndex === index.toString())? 'menu-element selected': 'menu-element';
		return (
			<div onClick={selectSize} key={index} index={index++} className={selected} title={s} >{s}</div>
		);
	} );

	let selectBox = showSizeOption && (				
					<div className="select-size-box">
						{lists}
					</div>
				);

	let label = selectedSizeIndex ? sizes[selectedSizeIndex] : 'Select size';

	return (
		<div className={className}>
			<button type="button" className="dropdown-select" title="Select size" onClick={handleClick}>
				<span className="select-size-text">{label}</span>
				<svg>
					<symbol id="dropdown" viewBox="0 0 16 24"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M1.5 9L8 15.5 14.5 9"></path></symbol>
					<use href="#dropdown"></use>
				</svg>
			</button>
			{selectBox}
		</div>
	);
};

const StyledSizeDropdown = styled(SizeDropdown)`
	cursor: pointer;
    display: block;
    position: relative;

    .dropdown-select {
    	align-items: center;
    	background: #fff;
	    border: 1px solid #767677;
	    cursor: pointer;
	    display: flex;
	    height: 50px;
	    justify-content: space-between;
	    line-height: 20px;
	    padding: 0 20px;
	    width: 100%;
	    box-sizing: border-box;
    }

    .select-size-text {
    	font-size: 14px;
    	letter-spacing: 2px;
    	text-transform: uppercase;
	    font-family: AdihausDIN,Helvetica,Arial,sans-serif;
	    font-weight: 700;
	    cursor: pointer;
    }

    .select-size-box {
    	background-color: #fff;
    	border: 1px solid #767677;
    	display: flex;
		transform: translateY(-1px);
		z-index: 2;
		box-sizing: border-box;
		padding: 20px 10px;
    }

    .menu-element {
    	display: flex;
		box-sizing: border-box;
    	font-size: 14px;
	    line-height: 20px;
	    align-items: center;
	    border: 1px solid #767677;
	    cursor: pointer;
	    height: 40px;
	    justify-content: center;
	    line-height: 1.1;
	    margin: 0 5px 5px 0;
	    min-width: 40px;
	    padding: 0 14px;
	    text-align: center;

	    &:hover {
	   	    border-bottom-width: 3px;
	    	border-bottom-color: #000000;
	    }
	}

	.selected {
		border: 3px solid #000;
		font-weight: 800 
	}

    svg {
    	${props => props.showSizeOption ? "transform: scaleY(-1);" : ""};			
    }
`;

export default CompleteTheLook;