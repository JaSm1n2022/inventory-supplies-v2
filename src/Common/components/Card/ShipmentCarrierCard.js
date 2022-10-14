import React, { lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
//import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
//import Typography from '@material-ui/core/Typography';
import { red } from "@material-ui/core/colors";
import { loadImg } from "../../../Util/loadImg";
import { withRouter } from "react-router-dom";
import { DEFAULT_SELECTED_ITEM, LAYOUT_URL } from "../../../../utils/constants";
import RegularSkeleton from "../Skeleton/RegularSkeleton";
import Helper from "../../../../utils/helper";
import { Button, CardContent, Divider, Typography } from "@material-ui/core";
import SingleWithClearAutoComplete from "../AutoComplete/SingleWithClearAutoComplete";
import PersonIcon from "@material-ui/icons/Person";
const Edit = lazy(() =>
  import(/* webpackChunkName: 'iconEdit' */ "@material-ui/icons/Edit")
);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: (props) => props.maxWidth || 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: (props) => (props.avatarBkg ? props.avatarBkg : red),
  },
}));

function ShipmentCarrierCard(props) {
  const {
    logo,
    shipmentNbr,
    carrierSelected,
    carrierInfo,
    currentItem,
    autoCompleteInputHander,
    onChangeInputHandler,
    carrierList,
    handleAssignCarrier,
    handleCarrierClose,
  } = props;
  const classes = useStyles(props);

  const handleUnassign = () => {
    currentItem.isUnassigned = true;
    handleAssignCarrier(currentItem);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="driver">
            {logo ? <img src={logo} alt="" /> : <PersonIcon />}
          </Avatar>
        }
        action={
          carrierInfo && carrierInfo.name && carrierInfo.name !== "-" ? (
            <Button
              style={{
                fontFamily: "Roboto",
                fontSize: "10px",
                fontWeight: 500,
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: 1.71,
                letterSpacing: "0.4px",
                textAlign: "left",
              }}
              color="secondary"
              variant="contained"
              onClick={() => handleUnassign()}
            >
              Unassign
            </Button>
          ) : null
        }
        title={<h4>{shipmentNbr}</h4>}
        subheader={<h5>{carrierInfo.name}</h5>}
      />
      <Typography variant="h6">Assign Carrier</Typography>

      <CardContent>
        <div style={{ display: "inline-flex" }}>
          <div style={{ width: "200px" }}>
            <SingleWithClearAutoComplete
              value={carrierSelected || DEFAULT_SELECTED_ITEM}
              name="carrier"
              label={"Select Carrier"}
              placeholder={"Select Carrier"}
              onSelectHandler={autoCompleteInputHander}
              onChangeHandler={onChangeInputHandler}
              options={carrierList}
            />
          </div>
          &nbsp;
          <div style={{ width: "150px" }}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={() => handleAssignCarrier(currentItem)}
            >
              {carrierInfo && carrierInfo.name && carrierInfo.name !== "-"
                ? "Reassign"
                : "Assign"}
            </Button>
            &nbsp;
            <Button
              size="medium"
              variant="contained"
              color="default"
              onClick={() => handleCarrierClose()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default withRouter(ShipmentCarrierCard);
