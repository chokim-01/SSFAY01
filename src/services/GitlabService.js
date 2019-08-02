import Api from "@/services/Api";

const GITLAB_URL = "https://lab.ssafy.com/api/v4";

export default {
  getRepos(userName) {
    return Api(GITLAB_URL).get(`/users/${userName}/projects`);
  },
  getCommits(fullName, since, until) {
    return Api(GITLAB_URL).get(
      `/projects/${fullName}/repository/commits?since=${since.toISOString()}&until=${until.toISOString()}&all=true`
    );
  },
  getUsersCommits(fullName) {
    let userMails = [
      "k3y6reak@naver.com",
      "ydk9557819@naver.com",
      "chokim159@naver.com"
    ];
    var allCommits = Api(GITLAB_URL).get(
      `projects/${fullName}/repository/commits/`
    );
    var repoCommits = new Array();

    allCommits.then(data => {
      var commits = data["data"];
      for (var c = commits.length - 1; c >= 0; c--) {
        for (var u = 0; u < userMails.length; u++) {
          if (commits[c].author_email == userMails[u]) {
            repoCommits[u] = commits[c].message;
          }
        }
      }
    });
    return repoCommits;
  }
};
