		<Dialog

						onKeyDown={handleJoinUsingEnterKey}
						open
						classes={{
							paper: classes.dialogPaper
						}}
					>

						<DialogTitle className={classes.dialogTitle}
						>
							<Grid
								container
								direction='row'
								justify='space-between'
								alignItems='center'


							>
								<Grid item

								>
									{config.logo ?
										<img alt='Logo' src={config.logo} /> :
										<Typography variant='h5'> {config.title} </Typography>
									}
								</Grid>

								<Grid item >
									<Grid
										container
										direction='row'
										justify='flex-end'
										alignItems='center'
									>

										{/* LOCALE SELECTOR */}
										<Grid item>

											<Grid container direction='column' alignItems='center'>
												<Grid item>
													<PopupState variant='popover' popupId='demo-popup-menu'>
														{(popupState) => (
															<React.Fragment>
																<Button
																	className={classes.actionButton}
																	aria-label={locale.split(/[-_]/)[0]}
																	color='secondary'
																	disableRipple
																	style={{ backgroundColor: 'transparent' }}
																	{...bindTrigger(popupState)}
																>
																	{locale.split(/[-_]/)[0]}
																</Button>
																<Menu {...bindMenu(popupState)}>
																	{localesList.map((item, index) => (
																		<MenuItem
																			selected={item.locale.includes(locale)}
																			key={index}
																			onClick={() => {
																				roomClient.setLocale(item.locale[0]);
																				// handleMenuClose();
																			}}
																		>
																			{item.name}
																		</MenuItem>)
																	)}

																</Menu>
															</React.Fragment>
														)}
													</PopupState>
												</Grid>

												{config.loginEnabled &&
													<Grid item>
														<div className={classes.loginLabel}>&nbsp;</div>
													</Grid>
												}

											</Grid>

										</Grid>
										{/* /LOCALE SELECTOR */}

										{/* LOGIN BUTTON */}
										{config.loginEnabled &&
											<Grid item
											>
												<Grid container direction='column' alignItems='center'>
													<Grid item>
														<IconButton
															className={classes.accountButton}
															onClick={
																loggedIn ?
																	() => roomClient.logout(roomId) :
																	() => roomClient.login(roomId)
															}
														>
															<AccountCircle
																className={
																	classnames(
																		classes.accountButtonAvatar,
																		loggedIn ? classes.green : null
																	)
																}
															/>
														</IconButton>
													</Grid>
													<Grid item>
														<div className={classes.loginLabel}>
															<FormattedMessage
																id={loggedIn ? 'label.logout' : 'label.login'}
																defaultMessage={loggedIn ? 'Logout' : 'Login'}
															/>
														</div>
													</Grid>
												</Grid>

											</Grid>
										}
										{/* /LOGIN BUTTON */}
									</Grid>
								</Grid>
							</Grid>
						</DialogTitle>

						<DialogContent>
							<hr />
							{/* ROOM NAME */}
							<TextField
								autoFocus
								id='roomId'
								label={intl.formatMessage({
									id: 'label.Enter Your Classes Name',
									defaultMessage: 'Enter Your Classes Name'
								})}
								value={roomId}
								variant='outlined'
								margin='normal'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<MeetingRoomIcon />
										</InputAdornment>
									)
								}}
								onChange={(event) => {
									const { value } = event.target;

									setRoomId(value.toLowerCase());

								}}
								onFocus={handleFocus}
								onBlur={() => {
									if (roomId === '')
										setRoomId(randomString({ length: 8 }).toLowerCase());
								}}
								fullWidth
							/>
							{/* /ROOM NAME */}

							{/* AUTH TOGGLE BUTTONS */}
							{false &&
								<Grid container
									direction='row'
									justify='space-between'
									alignItems='center'
								>
									<Grid item>
										<ToggleButtonGroup
											value={authType}
											onChange={handleSetAuthType}
											aria-label='choose auth'
											exclusive
										>
											<ToggleButton value='guest'>
												<WorkOutlineIcon />&nbsp;

												<FormattedMessage
													id='label.guest'
													defaultMessage='Guest'
												/>
											</ToggleButton>

											<ToggleButton value='auth'>
												<VpnKeyIcon />&nbsp;

												<FormattedMessage
													id='label.auth'
													defaultMessage='Auth'
												/>
											</ToggleButton>

										</ToggleButtonGroup >

									</Grid>

								</Grid>
							}
							{/* /AUTH TOGGLE BUTTONS */}

							{/* NAME FIELD */}
							<TextField
								id='displayname'

								label={intl.formatMessage({
									id: 'label.yourName',
									defaultMessage: 'Enter Your Name'
								})}
								value={displayName}
								variant='outlined'
								onFocus={handleFocus}

								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<AccountCircle />
										</InputAdornment>
									)
								}}

								margin='normal'

								disabled={displayNameInProgress}
								onChange={(event) => {
									const { value } = event.target;

									changeDisplayName(value);
								}}
								onKeyDown={handleChangeDisplayName}
								onBlur={() => {
									displayName = displayName.trim();

									if (room.inLobby)
										roomClient.changeDisplayName(displayName);
								}}
								fullWidth
							/>
							{/* NAME FIELD*/}

							{!room.inLobby && room.overRoomLimit &&
								<DialogContentText className={classes.red} variant='h6' gutterBottom>
									<FormattedMessage
										id='room.overRoomLimit'
										defaultMessage={
											'The room is full, retry after some time.'
										}
									/>
								</DialogContentText>
							}
						</DialogContent>

						{!room.inLobby ?

							<DialogActions>

								<Grid container
									direction='row'
									justify='space-between'
									alignItems='flex-end'
									spacing={1}
								>

									{/* Choose ---------------MEDIA PERMISSIONS TOGGLE BUTTONS */}

									<Grid item>
										<FormControl component='fieldset'>
											<Box mb={1}>
												<FormLabel component='legend'>
													<FormattedMessage
														id='devices.chooseMedia'
														defaultMessage='Choose Media'
													/>
												</FormLabel>
											</Box>
											<ToggleButtonGroup
												value={JSON.stringify(mediaPerms)}
												size='small'
												onChange={handleSetMediaPerms}
												className={
													JSON.stringify(mediaPerms) ===
														'{"audio":false,"video":false}' ?
														classes.mediaDevicesNoneSelectedButton :
														classes.mediaDevicesAnySelectedButton
												}
												aria-label='choose permission'
												exclusive
											>
												<ToggleButton value='{"audio":false,"video":false}'>
													<Tooltip title={intl.formatMessage({
														id: 'devices.disableBothMicrophoneAndCamera',
														defaultMessage: 'Disable both Microphone And Camera'
													})} placement='bottom'
													>
														<BlockIcon />
													</Tooltip>
												</ToggleButton>
												<ToggleButton value='{"audio":true,"video":false}'>
													<Tooltip title={intl.formatMessage({
														id: 'devices.enableOnlyMicrophone',
														defaultMessage: 'Enable only Microphone'
													})} placement='bottom'
													>

														<MicIcon />
													</Tooltip>
												</ToggleButton>
												<ToggleButton value='{"audio":false,"video":true}'>
													<Tooltip title={intl.formatMessage({
														id: 'devices.enableOnlyCamera',
														defaultMessage: 'Enable only Camera'
													})} placement='bottom'
													>
														<VideocamIcon />
													</Tooltip>
												</ToggleButton>
												<ToggleButton value='{"audio":true,"video":true}'>
													<Tooltip title={intl.formatMessage({
														id: 'devices.enableBothMicrophoneAndCamera',
														defaultMessage: 'Enable both Microphone and Camera'
													})} placement='bottom'
													>
														<span style={{ display: 'flex', flexDirection: 'row' }}>
															<MicIcon />+<VideocamIcon />
														</span>
													</Tooltip>
												</ToggleButton>
											</ToggleButtonGroup >
										</FormControl>
									</Grid>

									{/* /MEDIA PERMISSION BUTTONS */}

									{/* JOIN/AUTH BUTTON */}
									<Grid item className={classes.joinButton}>
										<Button
											onClick={handleJoin}
											variant='contained'
											color='primary'
											id='joinButton'
											disabled={displayName === ''}
											fullWidth
										>
											<FormattedMessage
												id='label.join'
												defaultMessage='Join'
											/>
										</Button>

									</Grid>
									{config.infoTooltipText !== '' &&

										<div className={classes.infoToolTip}
											style={{
												'padding-top': '20px',
												'overflowX': 'auto',
												'width': '100%',
												'display': 'flex',
												'align-items': 'center'
											}}
										>
											<InfoIcon />
											{config.infoTooltipLink !== '' &&
												<a
													style={{
														'text-decoration': 'none',
														'padding-left': '5px'
													}}
													href={config.infoTooltipLink}
												>{config.infoTooltipText}</a>
											}

											{config.infoTooltipLink === '' &&
												<p style={{
													'text-decoration': 'none',
													'padding-left': '5px'
												}}
												>{config.infoTooltipText}</p>
											}
										</div>
									}
									{config.infoTooltipDesc !== '' &&
										<div
											className={classes.infoToolTip}
											style={{
												'padding-top': '15px',
												'overflowX': 'auto',
												'width': '100%',
												'display': 'flex',
												'align-items': 'center'
											}}
										>
											{config.infoTooltipDesc}
										</div>
									}

									{authType === 'auth' && !loggedIn &&
										<Grid item>
											<Button
												onClick={handleAuth}
												variant='contained'
												color='secondary'
												id='joinButton'
											>
												<FormattedMessage
													id='room.login'
													defaultMessage='Next'
												/>
											</Button>

										</Grid>
									}
									{authType === 'auth' && loggedIn &&
										<Grid item>
											<Button
												onClick={handleJoin}
												variant='contained'
												className={classes.joinButton}
												id='joinButton'
											>
												<FormattedMessage
													id='room.login'
													defaultMessage='Join'
												/>
											</Button>

										</Grid>
									}


									{/* /JOIN BUTTON */}

								</Grid>

							</DialogActions>
							:
							<DialogContent>
								<DialogContentText
									className={classes.green}
									gutterBottom
									variant='h6'
									style={{ fontWeight: '600' }}
									align='center'
								>
									<FormattedMessage
										id='room.youAreReady'
										defaultMessage='Ok, you are ready'
									/>
								</DialogContentText>
								{room.signInRequired ?
									<DialogContentText
										gutterBottom
										variant='h5'
										style={{ fontWeight: '600' }}
									>
										<FormattedMessage
											id='room.emptyRequireLogin'
											defaultMessage={
												`The room is empty! You can Log In to start 
										the meeting or wait until the host joins`
											}
										/>
									</DialogContentText>
									:
									<DialogContentText
										gutterBottom
										variant='h5'
										style={{ fontWeight: '600' }}
									>
										<FormattedMessage
											id='room.locketWait'
											defaultMessage='The room is locked - hang on until somebody lets you in ...'
										/>
									</DialogContentText>
								}
							</DialogContent>
						}

						{/* { !isElectron() &&
					<CookieConsent buttonText={intl.formatMessage({
						id             : 'room.consentUnderstand',
						defaultMessage : 'I understand'
					})}
					>
						<FormattedMessage
							id='room.cookieConsent'
							defaultMessage='This website uses cookies to enhance the user experience'
						/>
					</CookieConsent>
				} */}
					</Dialog>