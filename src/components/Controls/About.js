import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRoomContext } from '../../RoomContext';
import * as roomActions from '../../store/actions/roomActions';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { config } from '../../config';

const styles = (theme) =>
({
	dialogPaper:
	{
		width: '30vw',
		[theme.breakpoints.down('lg')]:
		{
			width: '40vw'
		},
		[theme.breakpoints.down('md')]:
		{
			width: '50vw'
		},
		[theme.breakpoints.down('sm')]:
		{
			width: '70vw'
		},
		[theme.breakpoints.down('xs')]:
		{
			width: '90vw'
		}
	},
	logo:
	{
		marginRight: 'auto'
	},
	link:
	{
		display: 'block',
		textAlign: 'center',
		marginBottom: theme.spacing(1)
	},
	divider:
	{
		marginBottom: theme.spacing(3)
	}
});
const eduMeetUrl = 'https://edumeet.org';
const About = ({
	aboutOpen,
	handleCloseAbout,
	classes
}) => {
	return (
		<Dialog
			open={aboutOpen}
			onClose={() => handleCloseAbout(false)}
			classes={{
				paper: classes.dialogPaper
			}}
		>
			<DialogTitle id='form-dialog-title'>
				<FormattedMessage
					id='room.about'
					defaultMessage='About'
				/>
			</DialogTitle>
			<DialogContent dividers>
				<DialogContentText paragraph>
					EasyHai Online is the most promising Edu-tech company and is a fastest growing online learning and knowledge sharing company located in India. We help students through our online classes/Offline teaching methods and scientifically designed educational content offering through our online/offline modes to make their dreams come true and to think beyond the walls.
				</DialogContentText>
				<DialogContentText paragraph>
					What Makes EasyHai Online Different?
					The organization relies on the expertise of experience and efficient faculty and professionals and state of art monitoring system as well as latest teaching methodology.

					Why Choose EasyHai Online?
					Easy Hai Online is a young, forward-thinking side of the world that accredit on working together for teachers and students. Our agenda is to make way for our morning stars. 'Out-of-the-box' thinkers. We believe in the ”Transformation of a student instead of creation”.

					Our Vision
					Our vision is to make clear picture of rough imagination. The perception of EasyHai Online is of a highly trained, efficient and ingenious team which is true and proven. We are here to be the provider of knowledge for those who seek the excellence. We aim to be the crystal-clear choice by providing total solutions through novel and innovative service.

					Our offering
					EasyHai Online is a provider of Online Learning Education services and solutions for a broad range of demands in the era of challenges where Students to have a committed mentor who is agile and responsive with a comprehensive solution and the highest return on Knowledge investment that lasts. With a strong Student focus, EasyHai Online specializes in providing the impact driven educational platform with competencies along with latest technology, Subject expertise and also provide printed study-material in the form of books for the specific examination.
				</DialogContentText>


				<Link href={config.privacyUrl ? config.privacyUrl : 'privacy/privacy.html'} target='_blank' rel='noreferrer' color='secondary' className={classes.link}>
					@Data protection and Privacy Policy
				</Link>

			</DialogContent>
			<DialogActions>
				{config.logo && <img alt='Logo' className={classes.logo} src={config.logo} />}
				<Button onClick={() => { handleCloseAbout(false); }} color='primary'>
					<FormattedMessage
						id='label.close'
						defaultMessage='Close'
					/>
				</Button>
			</DialogActions>
				{/* <div style={{ width: "auto", backgroundColor: "grey", height: "500px" }}>
				<h1 style={{ textAlign: "center", marginTop: '40%' }}>Comming Soon....</h1>
			</div> */}
		</Dialog>
	);
};

About.propTypes =
{
	roomClient: PropTypes.object.isRequired,
	aboutOpen: PropTypes.bool.isRequired,
	handleCloseAbout: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>
({
	aboutOpen: state.room.aboutOpen
});

const mapDispatchToProps = {
	handleCloseAbout: roomActions.setAboutOpen
};

export default withRoomContext(connect(
	mapStateToProps,
	mapDispatchToProps,
	null,
	{
		areStatesEqual: (next, prev) => {
			return (
				prev.room.aboutOpen === next.room.aboutOpen
			);
		}
	}
)(withStyles(styles)(About)));