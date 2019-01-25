// @flow
import React from 'react';
import withRoot from '../../withRoot';

import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import {
  MenuItem,
  Button,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  SvgIcon,
  Icon,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  tableSortLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  CardMedia
} from '@material-ui/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * @fileOverview Makes pdf of react component(s)
 * @Author Sindre H. Paulshus
 * Courtesy of https://medium.com/@shivekkhurana/how-to-create-pdfs-from-react-components-client-side-solution-7f506d9dfa6d
 * Works like this: Wrap what u want to be pdf-d (react components) in a div with an id (or ids), pass that(those) id(s) to either
 * convertSingle or convertMultiple with a name ConvertPDF will then download the pdf for you
 */

export function convertSingleToPDF(input: any, name: string, height: number, width: number, callback: function) {
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF("landscape", "mm", [width, height]);
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save(name + '.pdf');
    callback();
  });
}

export function convertMultipleToPDF(input: [], name: string, height: number, width: number, callback: function) {
  const pdf = new jsPDF("landscape", "mm", [width, height]);
  console.log(Array.from(input));
  input.map((e, i) => {
    console.log('before canvas', i, e);
    html2canvas(e).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0);
      if (i < input.length - 1) {
        pdf.addPage();
      }
    });
  });
  setTimeout(() => {
    pdf.save(name + '.pdf');
    callback();
  }, 6000);
}

/**
* Experimental component
*/
export function PDFButton(props){
  return(
    <div className={'pdf-button-' + props.index}>
      <Tooltip title="last ned under" placement="top">
        <Button align="center" size="small" color="primary" variant="outlined"
          onClick={props.onClick}
        >
          <Save/>
          <Typography></Typography>
          {this.state.isLoadingPDF && (this.state.indexLoadingPDF == props.index) && (
            <CircularProgress size={24} />
          )}
        </Button>
      </Tooltip>
    </div>
  );
}

/*
<Button variant="contained" onClick={ () =>{
  const input = [
    document.getElementById('5/5'),
    document.getElementById('4/5'),
    document.getElementById('2/5')
  ];
  convertMultipleToPDF(input, "All");
  }}>
  Convert me to PDF
</Button>
*/
