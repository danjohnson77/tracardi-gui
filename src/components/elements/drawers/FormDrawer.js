import Drawer from "@material-ui/core/Drawer";
import React from "react";
import PropTypes from 'prop-types';

export default function FormDrawer(
    {
        width,
        open,
        onClose,
        children
    }) {

    return <Drawer anchor="right" open={open} onClose={onClose}>
        <div style={{width: (width) ? width : 1200, overflowX: "hidden"}}>
            {open && children}
        </div>
    </Drawer>
}

FormDrawer.propTypes = {
    width: PropTypes.number,
        label: PropTypes.string,
        open: PropTypes.bool,
        onClose: PropTypes.func
  };
