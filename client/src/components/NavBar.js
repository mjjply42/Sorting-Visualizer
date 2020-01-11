import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'flex',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
            width: 200,
        },
    },
    },
}));

const SortingSizeSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
    })(Slider);

    const DelaySlider  = withStyles({
        root: {
            color: 'red',
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -8,
            marginLeft: -12,
            '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 4,
        },
        })(Slider);

    function iconStyles() {
        return {
            successIcon: {
                color: "white",
                backgroundColor: 'green',
                "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: '#0e9c03'
                }
            },
            refreshIcon: {
                color: "white",
                backgroundColor: '#5278e3',
                "&:hover": {
                //you want this to be the same as the backgroundColor above
                backgroundColor: '#2f5de0'
                }
            },
            errorIcon: {
                color: 'red',
                "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: 'red',
                    color: 'white',
                    }
            },
        }
    }

export function NavBar() {
    const classes = useStyles();
    const sliders = makeStyles(iconStyles)();
    const dispatch = useDispatch()
    const count = useSelector(state => state.navState.amount)
    const stopped = useSelector(state => state.navState.stopped)
    const sorts = useSelector(state => state.navState.sortTypes)
    const [sortType, setSortType] = useState("QuickSort")

    const BootstrapInput = withStyles(theme => ({
        root: {
          'label + &': {
            marginTop: theme.spacing(3),
          },
        },
        input: {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }))(InputBase);

    const handleChange = event => {
        setSortType(event.target.value);
    };


    return (
    <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
            Sorting Visualizer
            </Typography>
            <div style={{marginRight: 80}}>
                <Fab style={{margin: 10}} size="small" aria-label="add" className={sliders.refreshIcon}>
                    <RefreshIcon/>
                </Fab>
                <Fab style={{margin: 10}} onClick={()=> {dispatch({type: 'update-stoppage', data: !stopped})}} 
                size="small" aria-label="add" className={stopped? sliders.successIcon:sliders.errorIcon}>
                    {stopped ? <DoneIcon/> : <CloseIcon/>}
                </Fab>
            </div>
            <FormControl className={classes.margin} style={{marginBottom: 23, marginLeft: -60, marginRight: 15, width: 150, minWidth: 100}}>
                <InputLabel id="demo-customized-select-label"></InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sortType}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                {sorts.map((item, index) => {
                    return (
                        <MenuItem value={item}>{item}</MenuItem>
                    )
                })}
                </Select>
            </FormControl>
            <div style={{width: 250, marginTop: 20, marginRight: 25}}>
            <Typography gutterBottom>Sorting Size</Typography>
            <SortingSizeSlider min={5} max={100} onChange={ (e, val) => dispatch({type:'update-count', data: val}) }   
            valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={count} />
            </div>
            <div style={{width: 250, marginTop: 20, marginRight: 15}}>
            <Typography gutterBottom>Delay (ms)</Typography>
            <DelaySlider min={500} max={2000} step={100} onChange={ (e, val) => dispatch({type:'update-delay', data: val}) }   
            valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={count} style={{width: 100}} />
            </div>
        </Toolbar>
        </AppBar>
    </div>
    );
}
