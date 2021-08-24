import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userActions'

// MUI imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/ToolTip';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
//Icons
import { Favorite, Chat } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
//Other plugins
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

function Notifications({ user, markNotificationsRead }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { notifications } = user;
    dayjs.extend(relativeTime);

    const handleOpen = (e) => {
        setAnchorEl(e.target)
    };
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onMenuOpened = () => {
        let unreadNotificationsIds = notifications.filter(not => !not.read)
                                        .map(not => not.notificationId)
        markNotificationsRead(unreadNotificationsIds)
    }

    let notificationIcon;
    if(notifications && notifications.length > 0) {
        notifications.filter((not) => not.read === false).length > 0
        ? (notificationIcon = (
            <Badge badgeContent={notifications.filter((not) => not.read === false).length}
                color="secondary">
                    <NotificationsIcon/>
            </Badge>
        )) : (
            notificationIcon = <NotificationsIcon/>
        )
    } else {
        notificationIcon = <NotificationsIcon/>
    }
    let notificationsMarkup = notifications && notifications.length > 0 ? (
        notifications.map(not => {
            const verb = not.type === "like" ? "liked" : "commented on";
            const time = dayjs(not.createdAt).fromNow();
            const iconColor = not.read ? "primary" : "secondary";
            const icon = not.type === "like" ? (
                <Favorite color={iconColor} style={{marginRight: 10}}/>
            ) : (
                <Chat color={iconColor} style={{marginRight: 10}}/>
            )
            return (
                <MenuItem onClick={handleClose} key={not.createdAt}>
                    {icon}
                    <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/users/${not.recipient}/scream/${not.screamId}`}
                    > {not.sender} {verb} your scream {time}</Typography>
                </MenuItem>
            )
        })
    ) : (
        <MenuItem onClick={handleClose}>
            You have no notifications yet.
        </MenuItem>
    )
    return (
        <>
            <ToolTip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleOpen}>
                        {notificationIcon}
                    </IconButton>
            </ToolTip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onEntered={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </>
    )
}

const mapStateToProps = ({ user }) => ({
    user
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications);

