import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';	

class Gallery extends Component {
	constructor (props) {
		super(props);

		const { onThumbSelect, rowId, selectedThumbIndex, selectedThumbId } = this.props;

		//console.log("rowId " + rowId);

		let lightBoxState = false;
		let curImage = 0;

		if (onThumbSelect !== undefined && rowId === selectedThumbId){
			lightBoxState = true;
			curImage = selectedThumbIndex
		}


		this.state = {
			lightboxIsOpen: lightBoxState,
			currentImage: curImage,
			onThumbSelect: onThumbSelect, 
			rowId: rowId
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {

		event.preventDefault();

		const { onThumbSelect, rowId } = this.state;

		if (onThumbSelect !== undefined){
			onThumbSelect(rowId, index);
		}
		
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		
		const { onThumbSelect } = this.state;

		if (onThumbSelect !== undefined){
			onThumbSelect(0, 0);
		}

		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		const { onThumbSelect, rowId } = this.state;
		if (onThumbSelect !== undefined){
			onThumbSelect(rowId, this.state.currentImage - 1);
		}

		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		const { onThumbSelect, rowId } = this.state;
		if (onThumbSelect !== undefined){
			onThumbSelect(rowId, this.state.currentImage + 1);
		}

		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		const { onThumbSelect, rowId } = this.state;
		if (onThumbSelect !== undefined){
			onThumbSelect(rowId, index);
		}

		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		const { images, baseIncidentUrl, imgaUrl} = this.props;

        if (!images) return;
        
		return (
			<div>
				<a
					href= {baseIncidentUrl + imgaUrl} 
					className={css(classes.thumbnail, classes['square'])}
					key={0}
					onClick={(e) => this.openLightbox(0, e)}
				>
                    <img  src = {baseIncidentUrl + imgaUrl} 
                    className={css(classes.source)} alt='s' />
				</a>

			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					preventScroll={this.props.preventScroll}
                    showThumbnails={this.props.showThumbnails}
					spinner={this.props.spinner}
					spinnerColor={this.props.spinnerColor}
					spinnerSize={this.props.spinnerSize}
					theme={this.props.theme}
				/>
			</div>
		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string,
};

const gutter = {
	small: 2,
	large: 4,
};
const classes = StyleSheet.create({
	gallery: {
		marginRight: -gutter.small,
		overflow: 'hidden',

		'@media (min-width: 10px)': {
			marginRight: -gutter.large,
		},
	},

	// anchor
	thumbnail: {

		lineHeight: 0,
		paddingRight: gutter.small,
		paddingBottom: gutter.small,
		overflow: 'hidden',

		'@media (min-width: 10px)': {
			paddingRight: gutter.small,
			paddingBottom: gutter.large,
		},
	},

	// orientation
	landscape: {
		width: '30%',
	},
	square: {
		paddingBottom: 0,
		width: '10%',

		'@media (min-width: 10px)': {
			paddingBottom: 0,
		},
	},

	// actual <img />
	source: {
		border: 0,
		display: 'block',
		height: 'auto',
        maxWidth: '100%',
  		width: 'auto',
	},
});

export default Gallery;
