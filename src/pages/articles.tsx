import React, { FC, Fragment, useCallback, useMemo } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import MyLayout from '../components/MyLayout';
import fs from 'fs'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

type Props = {
  blogDataString: string[]
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

function createData(title: string, date: string, tag: string[], imgpath: string, slug: string) {
  return { title, date, tag, imgpath, slug };
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Articles: FC<Props> = (props) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const matterdData = props.blogDataString.map(data => matter(data))
  const rowsData = matterdData.map(data => ({
    slug: data.data.slug,
    title: data.data.title,
    description: data.data.description,
    date: data.data.date,
    type: data.data.type,
    tag: data.data.tag,
    imgpath: data.data.imgpath
  }))

  const rows = rowsData.map(row => (createData(row.title, row.date, row.tag, row.imgpath, row.slug)))

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Fragment>
      <MyLayout>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
                ).map(row => (
                  <Link href={`/blog/${row.slug}`} key={row.title}>
                  <TableRow style={{cursor: 'pointer'}}>
                  <TableCell component="th" scope="row">
                    <img src={row.imgpath} width='50px' height='50px' />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <span style={{fontWeight: 'bold'}}>{row.title}</span>
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.tag.map((tag, index) => index === row.tag.length - 1 ? 
                    <span key={index}>{tag}</span>:
                    <span key={index}>{tag}&nbsp;&nbsp;</span>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {row.date}
                  </TableCell>
                </TableRow>
                  </Link>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50,{ label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </MyLayout>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(process.cwd() + '/docs', 'utf8')

  const blogs = files.filter((fn) => fn.endsWith(".md"))

  const blogDataString = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`
    const data = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    return data
  })

  const matteredData = blogDataString.map(blog => matter(blog))
  const blogDateArray = matteredData.map(el => {
    const timeSppietdBefore: string = el.data.date
    const timeSppietd: number[] = timeSppietdBefore.split('/').map(el => Number(el))
    return timeSppietd[0] * 24 * 366 + timeSppietd[1] * 24 * 31 + timeSppietd[2] * 24
  })
  
  for (let index = 0; index < blogDateArray.length-1; index++) {
    for (let index2 = 0; index2 < blogDateArray.length; index2++) {

      if (blogDateArray[index2] < blogDateArray[index2+1]) {
        let tmp = blogDateArray[index2]
        blogDateArray[index2] = blogDateArray[index2+1]
        blogDateArray[index2+1] = tmp
        
        let tmp2 = blogDataString[index2]
        blogDataString[index2] = blogDataString[index2+1]
        blogDataString[index2+1] = tmp2
      }

    }
  }

  return {
    props: {
      blogDataString: blogDataString,
    },
  }
}

export default Articles