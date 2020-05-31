


/* -------------------------------------------------------- POSTLIST VIEW --------------------------------------------------------*/
// Editor Settings
using ProgLang.csharp;
using ThemeName.oneLight;
using CurrentSubreddit.battlestations;
using ShowAllPreviews.true;
// Reddit Settings
using SortBy.hot;
using PostCount.25;

namespace Coddit{
  public class Subreddit{
    public freetalk_friday_22_may_2020(int score=15,string subreddit="battlestations") {
      var full_title = "Freetalk Friday, 22 May 2020";
      var author = "AutoModerator";
      var post_age = "5d";
      var self_text = "...";
      // Load comments in current tab
      loadComments(50);
    }
    public my_first_post_ever(int score=1859,string subreddit="battlestations") {
      var full_title = "My first post ever";
      var author = "Redman2811";
      var post_age = "10h";
      var image_link = "https://i.redd.it/8bgpn2p85b151.jpg";
      // Load comments in current tab
      loadComments(60);
    }
  }
}
/* -------------------------------------------------------- POSTLIST VIEW --------------------------------------------------------*/

/* -------------------------------------------------------- POST VIEW --------------------------------------------------------*/
// Editor Settings
using ProgLang.csharp;
using ThemeName.oneDark;
using CurrentSubreddit.nextfuckinglevel;
// Reddit Settings
using SortBy.hot;

namespace Coddit{
  public class Post{
    public good_for_him(int score=43875,string subreddit="nextfuckinglevel") {
      var full_title = "Good for him";
      var author = "GuiltyUpstairs";
      var post_age = "4h";
      var gildings=[1g,2w];
      var image_link="https://i.redd.it/n0fcp274b2251.png";
    }
  }
public class CommentList{
    var comment = new {
      author = "AutoModerator",
      score = 1,
      commentAge = "4h",
      /*
      Content posted to /r/nextfuckinglevel should represent something impressive, be it an action, an object, a skill, a moment, a fact that is above all others. Posts should be able to elicit a reaction of "that is next level" from viewers. Do not police or gatekeep the content of this sub (debate what is or is not next fucking level) in the comment section, 100% of the content is moderated.

      I am a bot, and this action was performed automatically. Please contact the moderators of this subreddit if you have any questions or concerns.

      */
    };
    var comment = new {
      author = "RunnyPlease",
      score = 897,
      commentAge = "3h",
      /*
      Tokushoryu had an absolute fairy tale moment in the January 2020 tournament. He entered the tournament as an M17 rank. Literally he was the lowest ranked sumo in a 15 day tournament and he fought his way to the top.

      Link to the match where the image is from with commentary from Jason from Jason’s All-Sumo channel.

      https://youtu.be/slDe-99-Kr8

      */
      childComment = new {
        author = "PhysicalGuidance69",
        score = 358,
        commentAge = "2h",
        /*
        Important note that he's still in the top division. He's the lowest rank in the top division. So it's still recognised that he's extremely good but even still a huge underdog for the title.

        */
      },
      childComment = new {
        author = "PhysicalGuidance69",
        score = 358,
        commentAge = "2h",
        /*
        Important note that he's still in the top division. He's the lowest rank in the top division. So it's still recognised that he's extremely good but even still a huge underdog for the title.

        */
      },
    };
}
/* -------------------------------------------------------- POST VIEW --------------------------------------------------------*/