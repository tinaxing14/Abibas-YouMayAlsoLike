import React from 'react';
import { render, shallow, mount } from 'enzyme';
import { YouMayAlsoLike, StyledCarousel, StyledProductCard } from '../ymal.jsx';
import { ymalBigMockData, ymalSmallMockData } from './mockdata.js';

describe('Render CompleteTheLook component', () => {
  it('renders the H5 title', () => {
	const ymal = render(<YouMayAlsoLike />);
    expect(ymal.find('h5').text()).toEqual('you may also like');
  });
});

describe('Render StyledCarousel component', () => {
	it('renders all ProductCard', () => {
		const noOfCards = ymalSmallMockData.length;
		const carousel = mount(<StyledCarousel products={ymalSmallMockData}/>);
		expect(carousel.find(StyledProductCard)).toHaveLength(noOfCards);
	})

	it('renders overflow ProductCard', () => {
		const noOfCards = ymalBigMockData.length;
		const carousel = mount(<StyledCarousel products={ymalBigMockData}/>);
		expect(carousel.find(StyledProductCard)).toHaveLength(noOfCards);
	});
});

describe('Render pagination dot', () => {
	it('renders pagination dot when only have one page', () => {
		const noOfPages = Math.ceil(ymalSmallMockData.length / 4);
		const carousel = mount(<StyledCarousel products={ymalSmallMockData}/>);
		expect(carousel.find('.pagination-dot')).toHaveLength(noOfPages);
	});

	it('renders pagination dot with more than one page', () => {
		const noOfPages = Math.ceil(ymalBigMockData.length / 4);
		const carousel = mount(<StyledCarousel products={ymalBigMockData}/>);
		expect(carousel.find('.pagination-dot')).toHaveLength(noOfPages);
	});
});

describe('Render StyledProductCard', () => {
	const card = mount(<StyledProductCard product={ymalSmallMockData[0]}/>);
	it('render product card', () => {
		expect(card).toMatchSnapshot();
	});
});