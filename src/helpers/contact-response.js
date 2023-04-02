export const emailResponse = (data) => {
  return  `
    <!-- Complete Email template -->

<body style="background-color:grey">
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="550" bgcolor="white" style="border:2px solid black">
		<tbody>
			<tr>
				<td align="center">
					<table align="center" border="0" cellpadding="0"
						cellspacing="0" class="col-550" width="550">
						<tbody>
							<tr>
								<td align="center" style="background-color: #2e6ffc;
										padding: 8px 20px;">

									<a href="www.berenia.com" style="text-decoration: none; color:white;
                                    font-weight:bold; font-style: 24px">
										
											Berenia Technology
									
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr style="height: 300px;">
				<td align="left" style="border: none;
						border-bottom: 2px solid #2e6ffc;
						padding-right: 20px;padding-left:20px">
                    <h2>Hello ${data.firstName}, </h2>

					<p style="font-weight: bold; font-size: 20px;
                    letter-spacing: 0.025em;
                    color:black;">
					Top of the day to you. This is to inform you that we have received your message and that you will receive feedback soon.
					</p>

                    <h2> Regards <br> Francis</h2>

				</td>
			</tr>

			<tr style="display: inline-block;">
				<td style="height: 150px;
						padding: 20px;
						border: none;
						border-bottom: 2px solid #361B0E;
						background-color: white;">
					
					<h2 style="text-align: left;
							align-items: center;">
						Zero Cost Development : An alternative way for client to get their small web design project done without payment.
                        
				</h2>
					<p class="data"
					style="text-align: justify-all;
							align-items: center;
							font-size: 15px;
							padding-bottom: 12px;">
                            Zero cost development is an initiation of Berenia Academy, where we allow our graduating team of developers to work on client project as their final project ...
					</p>
					<p>
						<a href=
"https://www.berenia.com"
						style="text-decoration: none;
								color:black;
								border: 2px solid #2e6ffc;
								padding: 10px 30px;
								font-weight: bold;">
						Read More
					</a>
					</p>
				</td>
			</tr>
			<tr style="border: none;
			background-color: #2e6ffc;
			height: 40px;
			color:white;
			padding-bottom: 20px;
			text-align: center;">
				
<td height="40px" align="center">
	<p style="color:white; line-height: 1.5em; font-style: 24px; font-weight: bold">
	Berenia Technology
	</p>
	<a href="#"
	style="border:none;
		text-decoration: none;
		padding: 5px;">
			
	<img height="30"
	src=
"https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
	width="30" />
	</a>
	
	<a href="#"
	style="border:none;
	text-decoration: none;
	padding: 5px;">
	
	<img height="30"
	src=
"https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
width="30" />
	</a>
	
	<a href="#"
	style="border:none;
	text-decoration: none;
	padding: 5px;">
	
	<img height="20"
	src=
"https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
		width="24"
		style="position: relative;
			padding-bottom: 5px;" />
	</a>
</td>
</tr>
<tr>
<td style="font-family:'Open Sans', Arial, sans-serif;
		font-size:11px; line-height:18px;
		color:#999999;"
	valign="top"
	align="center">
<a href="#"
target="_blank"
style="color:#999999;
		text-decoration:underline;">PRIVACY STATEMENT</a>
		| <a href="#" target="_blank"
		style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a>
		| <a href="#"
		target="_blank"
		style="color:#999999; text-decoration:underline;">RETURNS</a><br>
				© 2021 Berenia Technology. All Rights Reserved.<br>
				If you do not wish to receive any further
				emails from us, please
				<a href="www.berenia.com"
				target="_blank"
				style="text-decoration:none;
						color:#999999;">unsubscribe</a>
			</td>
			</tr>
			</tbody></table></td>
		</tr>
		<tr>
		<td class="em_hide"
		style="line-height:1px;
				min-width:700px;
				background-color:#ffffff;">
			<img alt=""
			src="images/spacer.gif"
			style="max-height:1px;
			min-height:1px;
			display:block;
			width:700px;
			min-width:700px;"
			width="700"
			border="0"
			height="1">
			</td>
		</tr>
		</tbody>
	</table>
</body>
    
    `
}