/*
* FeedEk jQuery RSS/ATOM Feed Plugin v3.0 with YQL API
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com   
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            DescCharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);
 
        var id = $(this).attr("id"), i, s = "", dt;
        $("#" + id).empty();
        if (def.FeedUrl == undefined) return;       
        $("#" + id).append('<img src="loader.gif" />');

        let parser = new RSSParser();

        parser.parseURL(def.FeedUrl, function(err, feed) {
            $("#" + id).empty(); 
            feed.items.slice(0, def.MaxCount).forEach(function(entry) { 
                s += '<li><div class="itemTitle"><a href="' + entry.link + '" target="' + def.TitleLinkTarget + '" >' + entry.title + '</a></div>';
                
                if (def.ShowPubDate){
                    dt = new Date(entry.pubDate);
                    s += '<div class="itemDate">';
                    if ($.trim(def.DateFormat).length > 0) {
                        try {
                            moment.lang(def.DateFormatLang);
                            s += moment(dt).format(def.DateFormat);
                        }
                        catch (e){s += dt.toLocaleDateString();}                            
                    }
                    else {
                        s += dt.toLocaleDateString();
                    }
                    s += '</div>';
                }
                if (def.ShowDesc) {
                    s += '<div class="itemContent">';
                    if (def.DescCharacterLimit > 0 && entry.description.length > def.DescCharacterLimit) {
                        s += entry.description.substring(0, def.DescCharacterLimit) + '...';
                    }
                    else {
                        s += entry.description;
                    }
                    s += '</div>';
                }; 
            });
            $("#" + id).append('<ul class="feedEkList">' + s + '</ul>');
        });
    };
})(jQuery);
