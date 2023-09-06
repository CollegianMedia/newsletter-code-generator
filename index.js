var express = require('express');
var ejs = require('ejs');
var bodyparse = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyparse.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.listen('8080');

var postlist = [];

app.get('/', (req,res)=>{
   res.render('pages/index', {postlist: postlist});
});

app.post('/submit',(req,res)=>{
    var title = req.body.title;
    var url = req.body.url;
    var imageurl = req.body.imageurl;
    var description = req.body.description;
    var post = {"title": title, "url": url, "imageurl": imageurl, "description": description };
    postlist.push(post);
    res.render('pages/index', {postlist: postlist});
});

app.post('/create', (req, res)=>{
    var content = "";
    postlist.forEach(post=>{
        var html = `<div class="mcnTextContent" style="padding: 20px;">
<hr>
<a href="
`;
        html = html + post.url + `style="text-decoration: none;"><h2 style="font-weight: normal; color: #007c89;">` + post.title + `</h2></a>
<br>
<center><img class="mcnImage" src="` + post.imageurl + `" Newsletteralt="" width="500" height="auto"></center>

<p>` + post.description + `</p>

<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%">
	<tbody class="mcnButtonBlockOuter">
		<tr>
			<td align="left" class="mcnButtonBlockInner" style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top">&nbsp;
			<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 3px;background-color: #7F54A3;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
				<tbody>
					<tr>
						<td align="center" class="mcnButtonContent" style="font-family: Arial;font-size: 16px;padding: 15px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="middle"><a class="mcnButton " href="` + post.url + `" style="font-weight: bold;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;word-wrap: break-word;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" target="_blank" title="Read More">Read More</a></td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>

</div>
`;      
        content = content + html;
    });
    res.render('pages/create', {content: content});
});

app.post('/restart', (req, res)=>{
   res.render('pages/index', {postlist: []}); 
});