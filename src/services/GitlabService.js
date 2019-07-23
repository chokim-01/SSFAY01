import Api from "@/services/Api";

const BASE_URL = "https://lab.ssafy.com/api/v4";

export default {
  getRepos(userName) {
    return Api(BASE_URL).get(`/users/${userName}/projects`);
  },
  getCommits(fullName, since, until) {
    return Api(BASE_URL).get(
      `/projects/${fullName}/repository/commits?since=${since.toISOString()}&until=${until.toISOString()}&all=true`
    );
  },
  getUsersCommits(fullName) {
    let userNames = [
      "k3y6reak@naver.com",
      "ydk9557819@naver.com",
      "chokim159@naver.com"
    ];
    var allCommits = Api(BASE_URL).get(
      `projects/${fullName}/repository/commits?all=true`
    );
    var repoCommits = new Array();

    allCommits.then(data => {
      var commits = data["data"];
      var chk = [0, 0, 0];
      var idx = 0;
      for (var c = 0; c < commits.length; c++) {
        if (typeof commits[c] !== "undefined") {
          if (chk[idx] === 0 && commits[c]["author_email"] === userNames[idx]) {
            repoCommits[idx] = commits[c]["message"];
            chk[idx] = 1;
            idx += 1;
          }
        }
      }
    });
    return repoCommits;
  }
};
