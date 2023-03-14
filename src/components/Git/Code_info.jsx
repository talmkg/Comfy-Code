import { Octokit } from "octokit";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, ProgressBar, Row, Spinner } from "react-bootstrap";
import { DiGithubAlt } from "react-icons/di";
import { HiOutlineBookOpen } from "react-icons/hi";
import { GiScales } from "react-icons/gi";
import { AiOutlineEye, AiOutlineStar } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";
import { RxDotFilled } from "react-icons/rx";
import { RiBookMarkLine } from "react-icons/ri";
import { TbNotebook } from "react-icons/tb";
import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";
const Code_info = (props) => {
  const [fetchData, setFetchData] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [repoLink, setRepoLink] = useState("");
  let margin = 0;
  const [error, serError] = useState(false);
  let localLanguages = [];
  const [languagesPerc, setLanguagesPerc] = useState([]);
  const git_token = useSelector((state) => state.git.git_token);
  const data = props.link.replace("https://github.com/", "");
  const usernameAndRepo = data.split("/");
  console.log(usernameAndRepo);
  const octokit = new Octokit({
    auth: git_token,
  });
  const fetchGit = async () => {
    let fetch;
    try {
      fetch = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: usernameAndRepo[0],
        repo: usernameAndRepo[1],
        per_page: 1,
      });
    } catch (error) {
      serError(true);
    }
    //https://api.github.com/repos/talmkg/Comfy-Code-BE/contributors
    const fetchLangs = await octokit.request(
      "GET /repos/{owner}/{repo}/languages",
      {
        owner: usernameAndRepo[0],
        repo: usernameAndRepo[1],
        per_page: 1,
      }
    );
    const fetchContributors = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: usernameAndRepo[0],
        repo: usernameAndRepo[1],
      }
    );

    setFetchData(fetch);
    languagesFunc(fetchLangs.data);
    setContributors(fetchContributors.data);
    // console.log("forks count: ", fetch.data.forks_count);
    // console.log("issues count: ", fetch.data.open_issues_count);
    // console.log("issues (all data): ", fetch.data.issues_url); //+1 fetch - diff page
    // console.log("pulls (all data): ", fetch.data.pulls_url); //+1 fetch - diff page

    setRepoLink(fetch.data.git_url.replace("git:", "https:"));
  };
  useEffect(() => {
    fetchGit();
  }, []);

  const languagesFunc = (languages) => {
    const allValues = Object.values(languages);
    let sum = 0;
    allValues.forEach((value) => {
      let s = sum + value;
      sum = s;
    });
    const arrayOfLangs = Object.keys(languages).map((key) => [
      String(key),
      languages[key],
    ]);
    const langs = [];
    const percentages = arrayOfLangs.map((lang) => {
      const title = lang[0];
      const size = lang[1];
      function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
      }
      const perc = percentage(size, sum);
      const flooredPerc = Math.round(perc);

      langs.push([title, flooredPerc]);
    });
    setLanguagesPerc(langs);
  };
  const setLocalLanguagesFunc = (name, color) => {
    localLanguages.push({ name, color });
    console.log(localLanguages);
  };

  return (
    <div
      className="d-block mt-1 rounded mx-2"
      style={{
        height: "300px",
        overflowY: "scroll",
        backgroundColor: "#373249",
        borderRadius: "5px",
      }}
    >
      <div className="h-100 w-100 position-relative">
        {fetchData.data ? (
          <Row className="h-100 w-100 g-0">
            <Col className="h-100 p-2 text-color overflow-hidden" xs={6}>
              <div
                className="d-flex flex-column justify-content-end h-100 pe-2"
                style={{
                  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="h-100">
                  <TbNotebook size={25} />
                  {fetchData.data.full_name}
                </div>
                <div className="pb-1">
                  <div className="pb-1">Contributors</div>
                  <div
                    className="d-flex w-100 position-relative"
                    style={{ height: "60px" }}
                  >
                    {contributors.map((contributor, i) => {
                      if (i !== 0) {
                        margin = margin + 25;
                        console.log(margin);
                      }

                      return (
                        <div className="position-absolute">
                          <img
                            src={contributor.avatar_url}
                            style={{
                              aspectRatio: 1 / 1,
                              objectFit: "cover",
                              borderRadius: "50%",
                              width: "50px",
                              marginLeft: `${margin}px`,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-100">
                  <div className="pb-2">Languages</div>
                  <div
                    className="w-100 d-flex overflow-hidden rounded-5"
                    style={{
                      height: "1rem",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    {languagesPerc.map((lang, i) => {
                      let randomColor = Math.floor(
                        Math.random() * 16777215
                      ).toString(16);
                      randomColor =
                        lang[0] === "JavaScript" ? "F0CA00" : randomColor;
                      randomColor =
                        lang[0] === "Python" ? "346C9B" : randomColor;
                      randomColor = lang[0] === "Java" ? "E76666" : randomColor;
                      randomColor = lang[0] === "C#" ? "38A6A5" : randomColor;
                      randomColor = lang[0] === "PHP" ? "9295BD" : randomColor;
                      randomColor = lang[0] === "C++" ? "E17C05" : randomColor;
                      randomColor = lang[0] === "Go" ? "5AB7D5" : randomColor;
                      setLocalLanguagesFunc(lang[0], randomColor);

                      if (i === 0) {
                        return (
                          <div
                            key={i}
                            className=""
                            style={{
                              height: "100%",
                              backgroundColor: `#${randomColor}`,
                              width: `${lang[1]}%`,
                              paddingLeft: `${lang[1]}%`,
                              borderTopLeftRadius: "1rem",
                              borderBottomLeftRadius: "1rem",
                            }}
                          ></div>
                        );
                      }
                      if (i !== 0 && i + 1 !== languagesPerc.length) {
                        return (
                          <div
                            key={i}
                            className="bg-danger"
                            style={{
                              height: "100%",
                              backgroundColor: `#${randomColor}`,
                              width: `${lang[1]}%`,
                              paddingLeft: `${lang[1]}%`,
                            }}
                          ></div>
                        );
                      }
                      if (i + 1 === languagesPerc.length) {
                        return (
                          <div
                            key={i}
                            style={{
                              height: "100%",
                              backgroundColor: `#${randomColor}`,
                              width: `${lang[1]}%`,
                              paddingLeft: `${lang[1]}%`,
                              borderTopRightRadius: "1rem",
                              borderTopEndRadius: "1rem",
                              borderBottomRightRadius: "1rem",
                            }}
                          ></div>
                        );
                      }
                    })}
                  </div>
                  <div className="w-100 d-flex">
                    {" "}
                    {localLanguages.map((lang) => {
                      return (
                        <div style={{ maxWidth: "33%" }}>
                          <RxDotFilled
                            size={20}
                            style={{ color: `#${lang.color}` }}
                          />
                          {lang.name}
                        </div>
                      );
                    })}
                  </div>
                  <div className="center-flex">
                    <Button
                      href={repoLink}
                      className="active-button center-flex"
                    >
                      <span className="me-1">View on Github</span>
                      <DiGithubAlt size={25} />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={6}>
              <div className="h-100 w-100 d-flex flex-column align-items-start p-2 text-color">
                <div className="position-relative w-100">
                  <h5>About</h5>
                  <p className="m-0" style={{ minHeight: "70px" }}>
                    {fetchData.data.description ? (
                      fetchData.data.description
                    ) : (
                      <div id="center">No description</div>
                    )}
                  </p>
                </div>
                <div>
                  <div className="pt-1 pb-1 d-flex align-items-center">
                    <HiOutlineBookOpen size={20} className="me-2" />
                    Readme
                  </div>
                  <div className="pt-1 pb-1 d-flex align-items-center">
                    <GiScales size={20} className="me-2" />
                    {fetchData.data?.license?.name
                      ? fetchData.data?.license?.name
                      : "No License"}
                  </div>
                  <div className="pt-1 pb-1  d-flex align-items-center">
                    <AiOutlineStar size={20} className="me-2" />
                    {fetchData.data.stargazers_count} stars
                  </div>
                  <div className="pt-1 pb-1 d-flex align-items-center">
                    <AiOutlineEye size={20} className="me-2" />
                    {fetchData.data.subscribers_count} watching
                  </div>
                  <div className="pt-1 pb-1 d-flex align-items-center">
                    <BiGitRepoForked size={20} className="me-2" />
                    {fetchData.data.forks_count} forks
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <div id="center">
            {error === true ? (
              <>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  The link for Github Reposity is not valid
                </Alert>
              </>
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Code_info;
