import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box, Container, Grid, Hidden, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    marginLeft: 25,
    ["@media (max-width:600px)"]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  rightpaper: {
    padding: theme.spacing(0),
    paddingLeft: 40,
    paddingTop: 30,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: "100%",
  },
}));

function Product({ post, categories }) {
  const classes = useStyles();
  const router = useRouter();

  // to waiting the resource being fetch
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header data={categories} />
      <Container maxWidth="md">
        <Grid container spacing={0}>
          <Hidden only={["xs", "sm"]}>
            <Grid item sm={1}>
              <Paper className={classes.paperImagePreview}>
                {post.product_image.map((c) => (
                  <div key={c.id}>
                    <Paper className={classes.paperImage}>
                      <img
                        src={post.product_image[0].image}
                        alt={post.product_image[0].alt_text}
                        className={classes.img}
                      />
                    </Paper>
                  </div>
                ))}
              </Paper>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperImage}>
              <img
                src={post.product_image[0].image}
                alt={post.product_image[0].alt_text}
                className={classes.img}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.rightpaper}>
              <Box component="h1" fontSize={18} fontWeight="400">
                {post.title}
              </Box>
              <Box component="p" fontSize={22} fontWeight="900" m={0}>
                RM{post.regular_price}
              </Box>
              <Box component="p" m={0} fontSize={14}>
                Free Delivery & Returns (Terms and Conditions Apply)
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

//Pre fetch purpose
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/api/${params.slug}`);
  const post = await res.json();

  const category_result = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await category_result.json();

  return {
    props: {
      post,
      categories,
    },
  };
}

export default Product;
