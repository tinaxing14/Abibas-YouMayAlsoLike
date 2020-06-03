import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class YouMayAlsoLike extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			products: []
    };
    this.getYMAL = this.getYMAL.bind(this);
  }
  

  getYMAL(id) {
    axios.get(`/api/shoes/${id}/relatedproducts`)
      .then((data) => {
        this.setState({products: data.data.relatedProducts});
      })
      .catch((err) => {
        if(err) {
          console.log(err)
        }
      })
  }

  componentDidMount() {
    this.getYMAL('2');
  }

	render(){
		return (
			<SectionContainer>
				<h5>you may also like</h5>
				<StyledCarousel products={this.state.products}/>
			</SectionContainer>
		);
	}
}

const SectionContainer = styled.div`
	width: 60%;
	margin-bottom: 80px;
	padding: 0 40px;
	
	font-family: AdihausDIN,Helvetica,Arial,sans-serif;
	font-style: normal;
	font-weight: 400;

	> h5{
		font-size: 30px;
		line-height: 28px;
		font-family: AdineuePRO,Helvetica,Arial,sans-serif;
		font-style: normal;
		font-weight: 600;
		margin-bottom: 20px;
		text-transform: uppercase;
	}
`;

class Carousel extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			currentPage: 0
		};

		this.imageList = React.createRef();
    this.cardPerPage = 4;
    this.totalCards = 12;

		this.scrollToPage = (currentPage) => {
			let el = this.imageList.current;
			let w = el.offsetWidth;
			el.scrollTo({left: w * currentPage, behavior: 'smooth'});
		}

		this.moveRight = () => {
      let numberOfPage = Math.ceil(this.totalCards / this.cardPerPage);
      console.log("number of page", numberOfPage)
			let currentPage = this.state.currentPage + 1;
      console.log(currentPage)
			if(currentPage >= numberOfPage){
				currentPage = 0;
			}

			this.scrollToPage(currentPage);
		}

		this.moveLeft = () => {
			let lastPage = Math.ceil(this.totalCards / this.cardPerPage) - 1;
      let currentPage = this.state.currentPage - 1;
      console.log(currentPage)
			
			if(currentPage < 0){
				currentPage = lastPage;
			}

			this.scrollToPage(currentPage);	
		}

		this.moveTo = (e) => {
			let page = Number(e.target.getAttribute('page'));
			this.scrollToPage(page);
		}

		this.setCurrentPage = () => {
			let el = this.imageList.current;
			let w = el.offsetWidth;
			let cardW = w / this.cardPerPage;	

			//update currentPage once scroll pass the fist card for better UX
			let currentPage = Math.ceil((el.scrollLeft - cardW) / w);

			this.setState({currentPage});
		}
	}

	render(){
		let index = 0;
		let pagination = [];
		let productCards = [];

		this.props.products.forEach( p => {	
			let snapStart = false;
			if(index % this.cardPerPage === 0){
				let isCurrentPage = (this.state.currentPage === Math.ceil(index / this.cardPerPage));
				let className = 'pagination-dot';
				if(isCurrentPage)
					className += ' current-page';

				pagination.push(
					<div key={index} page={Math.ceil(index / this.cardPerPage)} className={className} onClick={this.moveTo} />
				);
				snapStart = true;
			}

			productCards.push(<StyledProductCard product={p} snapStart={snapStart} key={index} />);
			index++;
		});

		return (
			<div className={this.props.className}>
				<div ref={this.imageList} className='image-list' onScroll={this.setCurrentPage}>
					{productCards}
				</div>
				<div className='pagination-button'>
					<button onClick={this.moveLeft} className='left'>
						<svg>
							<symbol id="arrow-right" viewBox="0 0 10 24"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M2 5.5L8.5 12 2 18.5"></path></symbol>
							<use href="#arrow-right"></use>
						</svg>							
					</button>
					<button onClick={this.moveRight} className='right'>
						<svg>
							<symbol id="arrow-right" viewBox="0 0 10 24"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M2 5.5L8.5 12 2 18.5"></path></symbol>
							<use href="#arrow-right"></use>
						</svg>							
					</button>
				</div>
				<div className='pagination'>
					{pagination}
				</div>
			</div>
		);
	}
}

const StyledCarousel = styled(Carousel)`
	position: relative;

	.image-list{
		display: flex;
		overflow-x: auto;
    overscroll-behavior-x: none;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		-ms-overflow-style: none;

		&::-webkit-scrollbar{
			display: none;
		}
	}

	.pagination-button{
		display: flex;
		width: 100%;
		justify-content: space-between;
		position: absolute;
		top: calc(50% - 20px);

		button{
			width: 24px;
			height: 24px;
			background-color: hsla(0,0%,100%,.7);
			cursor: pointer;
			position: relative;
			border: none;

			svg{
				width: 100%;
				height: 100%;
			}

			&:hover{
				background-color: #000;
				color: #fff;
			}

			&:focus{
				outline: none;
			}
		}

		.left{
			left: 1px;

			svg{
				transform: rotate(180deg);
			}
		}

		.right{
			right: 1px;
		}
	}

	.pagination{
		margin-top: 10px;
		display: flex;
		justify-content: center;
		min-height: 10px;
	}

	.pagination-dot{
		margin: 0px 4px;
		width: 18px;
		border-bottom: solid 1.2px #000;
		cursor: pointer;
		min-height: 5px;

		&:hover{
			border-bottom: solid 4px #000;
		}
	}

	.current-page{
		border-bottom: solid 4px #000;
	}
`;

class ProductCard extends React.Component{
	constructor(props){
		super(props);

    this.state = {
      liked: false
    };
    this.handleHeartClick = this.handleHeartClick.bind(this);
  }
  
  handleHeartClick(username, productname) {
    this.setState({liked: !this.state.liked})
    axios.post('api/shoes/likes', {userid: username,id: productname})
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }

	render(){
		let product = this.props.product;
		let like = this.state.liked ? '#wishlist-active' : '#wishlist-inactive';

		return (
			<div className={this.props.className}>
				<div className='heart-icon' onClick={() => {this.handleHeartClick("Kim Rempel", product.id)}}>
					<svg >
						<symbol id="wishlist-inactive" viewBox="0 0 20 24"><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M7.38 6H4.42L2 10l8 8 8-8-2.41-4h-2.98L10 9 7.38 6z"></path></symbol>
						<symbol id="wishlist-active" viewBox="0 0 20 24"><path fill="currentColor" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2" d="M7.38 6H4.42L2 10l8 8 8-8-2.41-4h-2.98L10 9 7.38 6z"></path></symbol>
						<use href={like}/>
					</svg>
				</div>
				<a href={product.href}>
					<img className='product-image' src={product.images} />
					<div className='product-tag'>Originals</div>
					<div className='product-title'>{product.title}</div>
					<div className='product-price'>${product.price}</div>
				</a>
			</div>
		);
	}
}

const StyledProductCard = styled(ProductCard)`
	width: 24%;
	flex: 0 0 auto;
	position: relative;
	margin-right: 1%;
	border: 1px solid transparent;
	min-height: 330px;

	${
		props => (props.snapStart) ? "scroll-snap-align: start;" : ""
	}

	&:hover {
		border: 1px solid #000;
	}

	.heart-icon {
		position: absolute;
		right: 16px;
		top: 16px;
		width: 24px;
		height: 24px;
		cursor: pointer;

		svg {
			width: 100%;
			height: 100%;
		}
	}

	.product-image {
		width: 100%
	}

	a {
		text-decoration: none;
	}

	.product-tag {
		margin: 15px 10px;
		font-size: 12px;
		color: #767677;
	}

	.product-title, .product-price {
		margin: 15px 10px 0px 10px;
		text-transform: uppercase;
		letter-spacing: .5px;
		font-size: 12px;
		line-height: 16px;
		color: #000;
	}

	.product-price {
		margin: 5px 10px;
	}
`;

export { YouMayAlsoLike, StyledCarousel, StyledProductCard };
