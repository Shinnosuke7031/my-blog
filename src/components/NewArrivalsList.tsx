import matter from 'gray-matter';
import React, { FC } from 'react';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '700px',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 375,
      margin: '0 auto',
    },
    root_mob: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 375,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    flexContent: {
      display: 'flex',
    },
    flexContent_mob: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 'bold',
    },
    date: {
      textAlign: 'right',
    },
  }),
);

type NewArrivalsListProps = {
  blogData: string[];
};

const NewArrivalsList: FC<NewArrivalsListProps> = (props) => {
  const classes = useStyles();
  const matteredData = props.blogData.map((blog) => matter(blog));
  const blogDataArray = matteredData.map((el) => el.data);
  const isMobileScreen = useMediaQuery({ query: '(max-width: 700px)' });
  return (
    <List className={isMobileScreen ? classes.root_mob : classes.root}>
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
              <ListItem
                divider={true}
                className={
                  isMobileScreen ? classes.flexContent_mob : classes.flexContent
                }
              >
                {index > 2 ? (
                  <ListItemText
                    className={`${classes.title} ${classes.listSection}`}
                    primary={blog.title}
                  />
                ) : (
                  <ListItemText
                    className={`${classes.title} ${classes.listSection}`}
                    primary={isMobileScreen ? `${blog.title}` : `${blog.title}`}
                  />
                )}
                {!(index > 2) && (
                  <p className={isMobileScreen ? 'fuwafuwa-mob' : 'fuwafuwa'}>
                    NEW!!
                  </p>
                )}
                <ListItemText className={classes.date} primary={blog.date} />
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
        p {
          position: absolute;
          left: 0.3rem;
          color: #be0000;
        }
        .fuwafuwa {
          -webkit-animation: fuwafuwa 2s infinite linear alternate;
          animation: fuwafuwa 2s infinite linear alternate;
        }
        @-webkit-keyframes fuwafuwa {
          0% {
            -webkit-transform: translate(0, 0) rotate(-5deg);
          }
          50% {
            -webkit-transform: translate(0, -5px) rotate(0deg);
          }
          100% {
            -webkit-transform: translate(0, 0) rotate(5deg);
          }
        }

        @keyframes fuwafuwa {
          0% {
            transform: translate(0, 0) rotate(-5deg);
          }
          50% {
            transform: translate(0, -5px) rotate(0deg);
          }
          100% {
            transform: translate(0, 0) rotate(5deg);
          }
        }
        .fuwafuwa-mob {
          position: absolute;
          bottom: -0.1rem;
          left: 6rem;
          -webkit-animation: fuwafuwa 2s infinite linear alternate;
          animation: fuwafuwa 2s infinite linear alternate;
        }
        @-webkit-keyframes fuwafuwa_mob {
          0% {
            -webkit-transform: translate(0, 0) rotate(-5deg);
          }
          50% {
            -webkit-transform: translate(0, -5px) rotate(0deg);
          }
          100% {
            -webkit-transform: translate(0, 0) rotate(5deg);
          }
        }

        @keyframes fuwafuwa_mob {
          0% {
            transform: translate(0, 0) rotate(-5deg);
          }
          50% {
            transform: translate(0, -5px) rotate(0deg);
          }
          100% {
            transform: translate(0, 0) rotate(5deg);
          }
        }
      `}</style>
    </List>
  );
};

export default NewArrivalsList;
