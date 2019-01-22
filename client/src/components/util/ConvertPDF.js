// @flow
import React from 'react';
import withRoot from '../../withRoot';

import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import { MenuItem, Button, Typography, Grid, Paper, Card, CardContent, SvgIcon, Icon,
        TableBody, TableHead, TableRow, TableCell, tableSortLabel,
        List, ListItem, ListItemText, ListSubheader, CardMedia
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

export function convertSingleToPDF(input: any, name: string){
  html2canvas(input)
  .then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save(name + '.pdf');
  });
}

export function convertMultipleToPDF(input: [], name: string){
  const pdf = new jsPDF();
  console.log(Array.from(input));
  input.map((e, i) => {
    console.log("before canvas", i, e);
    html2canvas(e)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0);
      if(i < input.length - 1){
        pdf.addPage();
      }
    });
  })
  setTimeout(() => {
    console.log("Yo!");
    pdf.save(name + '.pdf');
  }, 6000);
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
