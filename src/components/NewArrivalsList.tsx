import matter from "gray-matter"
import { FC } from "react"
import Link from 'next/link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '700px',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 1000,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    flexContent: {
      display: 'flex',
    },
    title: {
      fontWeight: 'bold'
    },
    date: {
      textAlign: 'right',
    }
  }),
);

type NewArrivalsListProps = {
  blogData: string[]
}

const NewArrivalsList: FC<NewArrivalsListProps> = (props) => {
  const classes = useStyles();
  const matteredData = props.blogData.map(blog => matter(blog))
  const blogDataArray = matteredData.map(el => el.data)
  console.log(blogDataArray)
  return (
      <List className={classes.root}>
        <ul>
          {blogDataArray.map((blog, index) => (
            
            <Link
              href={{
                pathname: '/blog/[slug]',
                query: { slug: blog.slug },
              }}
              key={index}
            >
              <div>
                <ListItem divider={true} className={classes.flexContent}>
                  <ListItemText className={`${classes.title} ${classes.listSection}`} primary={blog.title} />
                  {/* <ListItemText primary={blog.description} /> */}
                  <ListItemText className={classes.date} primary={blog.date} />
                  {/* {Array.isArray(blog.tag) 
                  ? blog.tag.map((tagElement, index) => <ListItemText key={index} primary={tagElement} />)
                  : <ListItemText primary={blog.tag} />
                  } */}
                </ListItem>
              </div>
            </Link>
          ))}
        </ul>
        <style jsx>{`
          ul {
            cursor: pointer;
            padding: 0;
          }
          div {
            list-style: none;
            margin: 0;
          }
          div :hover {
            background-color: rgb(160, 160, 160);
          }
        `}</style>
      </List>
  )
}

export default NewArrivalsList