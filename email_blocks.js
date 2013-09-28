var jQ = jQuery;

jQ(init);

function init() {
    jQ('button').click(do_merge);
}

function do_merge() {
    var txt = jQ('textarea').val();
    var count = parseInt(jQ('#count').val());
    var separator = jQ('#separator').val();
    var regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i
    regex.compile(regex);
    var emails = [];
    while (txt) {
        ans = regex.exec(txt)
        if (!ans) { 
            break; 
        }
        emails.push(ans[0]);
        txt = txt.substring(ans.index+ans[0].length);
    }
    
    var total = emails.length;
    
    unique = {};
    for (n in emails) {
        unique[emails[n].toLowerCase()] = emails[n];
    }
    emails = [];
    for (n in unique) {
        emails.push(unique[n]);
    }
    /* emails.sort(); - nope - indicates spam to some filters */
    
    jQ("#output").empty();
    jQ("#output").append(jQ("<p>"+total+" email addresses found.</p>"));
    if (emails.length != total) {
        jQ("#output").append(jQ("<p>Using "+emails.length+" unique emails.</p>"));
    }
    console.log([count, separator]);
    for (n in emails) {
        if (n % count == 0) {
            target = jQ("<div class='block'></div>");
            jQ("#output").append(target);
        }
        target.text(target.text() + emails[n]);
        var nn = parseInt(n);
        console.log([n, count, n+1, (n+1) % count, emails.length]);
        if (((nn+1) % count) != 0 && (nn+1) != emails.length) {
            target.text(target.text() + separator);
        }
    }
}
