// class based component

// import React, { Component } from "react";
// import Shoppingitem from "./Shoppingitem.js";
// import Spinner from "./Spinner.js";
// import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

// export default class Shopping extends Component {
//   static defaultProps = {
//     country: "in",
//     pageSize: 6,
//     category: "science",
//   };
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string,
//   };

//   capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   constructor(props) {
//     super(props);

//     state = {
//       articles: [],
//       loading: false,
//       page: 1,

//       totalResults: 0,
//     };
//     document.title = `${capitalizeFirstLetter(
//       props.category
//     )} - Shopping`;
//   }
//   async updateShopping() {
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=870b1dd621824fb389fa72b26ad66d0b&page=${state.page}&pageSize=${props.pageSize}`;
//     setState({ loading: true });

//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     props.setProgress(70);
//     console.log(parsedData);
//     setState({
//       articles: parsedData.articles,
//       totalResults: parsedData.totalResults,
//       loading: false,
//     });
//     props.setProgress(100);
//     console.log("loading in updateShopping");
//   }
//   async componentDidMount() {
//     updateShopping();
//   }

//   // handlePrevClick = async () => {
//   //   console.log("Previous");

//   //   setState({ page: state.page - 1 });
//   //   updateShopping();
//   // };
//   // handleNextClick = async () => {
//   //   console.log("Next");

//   //   setState({ page: state.page + 1 });
//   //   updateShopping();
//   // };

//   fetchMoreData = async () => {
//     setState({ page: state.page + 1 });
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=870b1dd621824fb389fa72b26ad66d0b&page=${state.page}&pageSize=${props.pageSize}`;
//     try {
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log(parsedData);
//       setState({
//         articles: state.articles.concat(parsedData.articles),
//         totalResults: parsedData.totalResults,
//       });
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setState({ loading: false });
//     }
//     console.log("loading in fetchMoreData");
//   };
//   render() {
//     return (
//       <div className="container my-3">
//         <h2 className="text-center">
//           {" "}
//           Top Maximum offer these{" "}
//           {capitalizeFirstLetter(props.category)} item
//         </h2>

//         {state.loading && <Spinner />}

//         <InfiniteScroll
//           dataLength={state.articles.length}
//           next={fetchMoreData}
//           // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.

//           hasMore={state.articles.length !== state.totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">
//               {state.articles.map((element, index) => {
//                 return (
//                   <div className="col-md-4" key={element.url + index}>
//                     <Shoppingitem
//                       title={element.title ? element.title.slice(0, 40) : ""}
//                       description={
//                         element.description
//                           ? element.description.slice(0, 70)
//                           : ""
//                       }
//                       imageUrl={element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author ? element.author.slice(0, 40) : ""}
//                       date={element.publishedAt}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//       </div>
//     );
//   }
// }

// functional based component

import React, { useEffect, useState } from "react";
import Shoppingitem from "./Shoppingitem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Shopping = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateShopping = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=870b1dd621824fb389fa72b26ad66d0b&page=${setPage}&pageSize=${props.pageSize}`;
    setloading(true);

    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setloading(false);

    props.setProgress(100);
    console.log("loading in updateShopping");
  };

  useEffect(() => {
    updateShopping();
    document.title = `${capitalizeFirstLetter(props.category)} - Shopping`;
  }, [props.category]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=870b1dd621824fb389fa72b26ad66d0b&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults();

    console.log("loading in fetchMoreData");
  };

  return (
    <div className="container my-3">
      <h2 className="text-center">
        {" "}
        Top Maximum offer these {capitalizeFirstLetter(props.category)} item
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.

        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={element.url + index}>
                  <Shoppingitem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 70)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author.slice(0, 40) : ""}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

Shopping.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "science",
};
Shopping.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default Shopping;
