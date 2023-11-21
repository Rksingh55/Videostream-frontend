import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Moderator from './Menu/Moderator';
import List from './List/List';
import Input from './Menu/Input';

const styles = () =>
	({
		root :
		{
			display       : 'flex',
			flexDirection : 'column',
			width         : '100%',
			height        : '100%',
			overflowY     : 'auto'
		}
	});

const Chat = (props) =>
{
	const {
		classes
	} = props;

	return (
		<Paper className={classes.root}>
			{/* <Moderator />
			<List />
			<Input /> */}
				<div style={{ width: "auto", backgroundColor: "grey", height: "500px" }}>
				<h1 style={{ textAlign: "center", marginTop: '40%' }}>Comming Soon....</h1>
			</div>
		</Paper>
	);
};

Chat.propTypes =
{
	classes : PropTypes.object.isRequired
};

export default withStyles(styles)(Chat);