import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Checkbox from "@material-ui/core/Checkbox";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

function createData(name: string) {
  return {
    name,
    children: [
      {
        key: 21,
        name: "Function 1",
        user: <Checkbox></Checkbox>
      },
      {
        key: 21,
        name: "Function 2",
        user: <Checkbox></Checkbox>
      }
    ]
  };
}

const CollapsedRow = ({ childrenRow, row }) => {
  const [openFunction, setOpenFunction] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={childrenRow.name}>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenFunction(!openFunction)}
          >
            {openFunction ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {childrenRow.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={openFunction}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.children.map((childrenRow) => (
                    <TableRow key={childrenRow.name}>
                      <TableCell component="th" scope="row">
                        {childrenRow.name}
                      </TableCell>
                      <TableCell>{childrenRow.user}</TableCell>
                      <TableCell>{childrenRow.user}</TableCell>
                      <TableCell>{childrenRow.user}</TableCell>
                      <TableCell>{childrenRow.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [openModule, setOpenModule] = React.useState(false);
  const [openFunction, setOpenFunction] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  // console.log("row", row);
  // for (const key in row) {
  //   if (Object.prototype.hasOwnProperty.call(row, key)) {
  //     const element = row[key];
  //     console.log("element", element);
  //   }
  // }
  return (
    <React.Fragment>
      <TableRow className={classes.root} style={{ background: "#3f51b5" }}>
        <TableCell style={{ width: "62px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenModule(!openModule)}
            style={{ color: "white" }}
          >
            {openModule ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "white" }}>{row.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openModule} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.children.map((childrenRow) => (
                    <CollapsedRow
                      row={row}
                      childrenRow={childrenRow}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  // createData({ moduleName :String,  functionName :String,  featureName :String, userTypeList:Array}),
  createData("Module 1"),
  createData("Module 2"),
  createData("Module 3"),
  createData("Module 4"),
  createData("Module 5")
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead></TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
