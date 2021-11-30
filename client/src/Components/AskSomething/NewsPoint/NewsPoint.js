import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import "./newspoint.css";

async function searchNews(q) {
  q = encodeURIComponent(q);

  // make a call to Bing News Api
  const response = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`,
    {
      method: "GET",
      // required headers with api keys
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "afa990c4c7mshad324471ac88136p125e52jsne67d08a6be98",
      },
    }
  );
  const body = await response.json();
  return body.value;
}

const NewsPoint = () => {
  const [query, setQuery] = useState("Software");

  const [loading, setLoading] = useState(false);
  // Set initial value to be displayed on landing, prevents loading wait time
  const [newsList, setNewsList] = useState([
    {
      _type: "NewsArticle",
      name: "November gardening jobs: 'Reinvigorate your garden beds and borders'",
      url: "https://www.express.co.uk/life-style/garden/1515132/gardening-jobs-november-ifl",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.3vNk-7rk3JKOlIjIaSpbfy&pid=News",
          width: 700,
          height: 415,
        },
      },
      description:
        "While the garden blooms in summer, the work continues all year round. Gardener Ellen Mary discussed the gardening jobs Britons should add to to-do lists in November. There are still opportunities to plant bulbs ready for the spring and summer,",
      about: [
        {
          _type: "Thing",
          readLink:
            "https://api.cognitive.microsoft.com/api/v7/entities/a77fc12b-772e-4804-268d-9febd6126ab3",
          name: "Daily Express",
        },
        {
          _type: "Thing",
          readLink:
            "https://api.cognitive.microsoft.com/api/v7/entities/4caa0cdc-3bca-027b-6c96-da0191516a65",
          name: "Gardening",
        },
      ],
      mentions: [
        {
          _type: "Thing",
          name: "Daily Express",
        },
        {
          _type: "Thing",
          name: "Gardening",
        },
        {
          _type: "Thing",
          name: "Garden",
        },
      ],
      provider: [
        {
          _type: "Organization",
          name: "Daily Express",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.8EfL3f80GkcbewW9X07mYA&pid=news",
            },
          },
        },
      ],
      datePublished: "2021-11-06T03:01:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Biden hails infrastructure deal as chance to tackle climate crisis and create 'millions of jobs'",
      url: "https://news.yahoo.com/biden-hails-infrastructure-deal-chance-044933627.html",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.StzqwC6ifl6L8jKHM1S1dC&pid=News",
          width: 700,
          height: 466,
        },
      },
      description:
        "Generations from now, people will look back and know this is when America won the economic competition for the 21st Century’",
      provider: [
        {
          _type: "Organization",
          name: "YAHOO!News",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.nYADEgS75l8rdCg9D-p_OQ&pid=news",
            },
          },
        },
      ],
      datePublished: "2021-11-06T04:49:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "IN FOCUS: Qualified, willing but still looking for work - why some mature PMEs struggle to find jobs despite retraining, government support",
      url: "https://www.channelnewsasia.com/singapore/singapore-mature-pme-unemployed-job-search-wsg-2293696",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.iojb4IGG7q616-pZkNtHpS&pid=News",
          width: 700,
          height: 394,
        },
      },
      description:
        "Is there ageism in the workplace and hiring process? PME jobseekers tell CNA about the stumbling blocks they meet when they look for work at age 40 and above.",
      about: [
        {
          _type: "Thing",
          readLink:
            "https://api.cognitive.microsoft.com/api/v7/entities/85fa63d3-9596-adb9-b4eb-502273d84f56",
          name: "India",
        },
      ],
      provider: [
        {
          _type: "Organization",
          name: "Channel NewsAsia Singapore",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.savHCg5UzraQlypYVIFYUg&pid=news",
            },
          },
        },
      ],
      datePublished: "2021-11-05T22:00:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "US added 531,000 jobs in October; unemployment rate fell 4.6%",
      url: "https://tulsaworld.com/business/us-added-531-000-jobs-in-october-unemployment-rate-fell-4-6/article_fb80b78a-5557-51d3-ad87-c003440b049a.html",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.JQ2_s_5peNjEG6UwPwg8aS&pid=News",
          width: 700,
          height: 393,
        },
      },
      description:
        "Friday’s report from the Labor Department also showed that the unemployment rate fell to 4.6% last month from 4.8% in September. That is a comparatively low level though still well",
      provider: [
        {
          _type: "Organization",
          name: "Tulsa World",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.S_sJ5hu-Y2W0qog4MDLanA&pid=news",
            },
          },
        },
      ],
      datePublished: "2021-11-06T05:00:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Takeaways from the October jobs report",
      url: "https://sg.news.yahoo.com/takeaways-october-jobs-report-131903269.html",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.09jNyshYj7p1aLo62WCA6y&pid=News",
          width: 700,
          height: 393,
        },
      },
      description:
        "Betsey Stevenson, Professor of Public Policy and Economics The Ford School, University of Michigan and Emily Roland, John Hancock Investment Management Co-Chief Investment Strategist join Yahoo Finance to break down the October jobs report.",
      provider: [
        {
          _type: "Organization",
          name: "Yahoo News Singapore",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.kkwLo8iJPFcWP1fA_VstCQ&pid=news",
            },
          },
        },
      ],
      datePublished: "2021-11-05T21:19:00.0000000Z",
      video: {
        _type: "VideoObject",
        name: "Takeaways from the October jobs report",
        thumbnailUrl:
          "https://www.bing.com/th?id=OVF.0nQn8MakhzSCDQ2jZDnw3Q&pid=News",
        thumbnail: {
          _type: "ImageObject",
          width: 300,
          height: 168,
        },
      },
    },
  ]);

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    searchNews(query).then((res) => {
      setNewsList(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    searchNews(query).then((res) => {
      setNewsList(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* User can enter text to search web */}
      <form style={{ paddingBottom: "3%" }}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search On Web"
        />

        <Button
          variant="outlined"
          color="success"
          size="large"
          onClick={search}
        >
          Search
        </Button>
      </form>

      {loading ? (
        <CircularProgress />
      ) : newsList.length === 0 ? (
        <p>
          <i>No results</i>
        </p>
      ) : (
        <ul>
          {newsList.map((item, i) => (
            <NewItem key={i} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

// News card item to display text
function NewItem({ item }) {
  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, "$& ").trim();
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: "long" });

  return (
    <li className="item">
      {item.image && (
        <img
          className="thumbnail"
          alt=""
          src={item.image?.thumbnail?.contentUrl}
        />
      )}

      {/* open link of article in new page */}
      <a
        className="title"
        href={item.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {item.name}
      </a>

      <p className="description">{item.description}</p>

      {/* Date time */}
      <div className="meta">
        <span>{formatDate(item.datePublished)}</span>

        <span className="provider">
          {item.provider[0].image?.thumbnail && (
            <img
              className="provider-thumbnail"
              alt=""
              src={item.provider[0].image?.thumbnail.contentUrl + "&w=16&h=16"}
            />
          )}
          {item.provider[0].name}
        </span>

        {/* Categories related to */}
        {item.category && <span>{separateWords(item.category)}</span>}
      </div>
    </li>
  );
}

export default NewsPoint;
