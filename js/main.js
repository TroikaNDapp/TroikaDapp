// Staked Tokens the Smart Contract
const nodeUrl = 'https://nodes.wavesplatform.com';
let dAppAddress = "3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE"
let StakedToken = "EbLVSrAi6vS3AkLwBinzZCvAXP2yYiFJEzj1MBVHcwZ5"
let FundBox     = "3MsH5Hr1qQYUnwq4HTpiaGpXQi6cGPUsa5n"
let GovernToken = "DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP"


// Smart Contract Balance
function UpdateBalanceContract (){
	$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/FundBox',  
	function (Reward) {
			if (Reward.length == 0) {
				document.getElementById("ContractReward").innerHTML = 'Reward Available: 0.0 ASIMI';
			}
			else{
				document.getElementById("ContractReward").innerHTML = 'Reward Available: '+ Math.trunc((Reward.value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' ASIMI';
			}
		});	

	// Smart Contract Balance Staked
	$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/StakeBalance',
	function (result) {
		
			if (result.length == 0) {
				document.getElementById("ContractStaked").innerHTML = 'Staked: 0.0 ASIMI';
			}	
			else{
				document.getElementById("ContractStaked").innerHTML = 'Staked: '+ Math.trunc((result.value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' ASIMI';
			}
			
			
		});
		
		// Smart Contract Balance
		// ..................

		$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/HighestPush',  
		function (AuctionReward) {
				
				if (AuctionReward.length == 0) {
					document.getElementById("Auction").innerHTML = 'Be First to Push';
				
				}
				else{
					if (AuctionReward.value == 0) {
						document.getElementById("Auction").innerHTML = 'Be First to Push';
						
						}
					else					
						document.getElementById("Auction").innerHTML = 'Highest Push: '+Math.trunc((AuctionReward.value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' TROIKA';				
					
				}
			}).fail(function() { 
						document.getElementById("Auction").innerHTML = 'Be First to Push';										
					});	
}

var interval = setInterval(function () { UpdateBalanceContract(); }, 3000);

function UpdateBalance(dAppAddress,Address,StakedToken,GovernToken){	

		// Stake Token Balance of the User's Wallet.
		$.when(
			$.getJSON(nodeUrl+'/assets/balance/'+Address+'/'+StakedToken),
			$.getJSON(nodeUrl+'/assets/balance/'+Address+'/'+GovernToken)
			).done(function (ASIMIBalance, TroikanBalance) {
				
				if (ASIMIBalance.length == 0) {
					document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: 0.0 ASIMI'
					if (TroikanBalance.length == 0) {
						document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: 0.0 Troikan'
					}else{
						document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: '+Math.trunc((TroikanBalance.balance/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' Troikan'
					}
				}else{
					document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: '+Math.trunc((ASIMIBalance.balance/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' ASIMI'
					if (TroikanBalance.length == 0) {
						document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: 0.0 Troikan'
					}else{
						document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: '+Math.trunc((TroikanBalance.balance/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' Troikan'
					}
				}

			});		

			//http://nodes.wavesplatform.com/assets/balance/3P74buHt98BnojFcaREJZtb98KDyUmZGemJ/DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP

		// Stake Token Balance of the User's in Smart Contract
		$.when(
			$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/'+Address+'_Staking'),
			$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/'+Address+'_UserLastStakeBlock'),
			$.getJSON("https://nodes.wavesplatform.com/blocks/height")
			).done(function (Stakedbalance, UserLastBlock, HeightBlockch) {						
				if (Stakedbalance.length == 0) {
					document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: 0.0 ASIMI';
				} 
				else {
				
					StakingDays =  Math.trunc((HeightBlockch[0].height-UserLastBlock[0].value)/1440)
					document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: '+ Math.trunc((Stakedbalance[0].value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' ASIMI '+'<br> Stake Maturity: '+ StakingDays+' days'
				}
					
			});	

		// Govern Token Balance of the User's in Smart Contract
		$.when(
			$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/'+Address+'_Earnings'),  
			$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_Push'),	  
			).done(function (GovernTokenBalance, UserPush) {				
				console.log('GovernTokenBalance: ',GovernTokenBalance[0])
				console.log('UserPush: ', UserPush[0])
				if (GovernTokenBalance[0].length == 0) {
					document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : 0.0 Troika';
					if (UserPush[0].length == 0) {
						document.getElementById("UserLastPush").innerHTML = 'Your Actual Push : 0.0 Troika';
					}
					else{
						document.getElementById("UserLastPush").innerHTML = 'Your Actual Push : '+Math.trunc((UserPush[0].value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' Troika';
					}						
				}
				else{
					document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : '+Math.trunc((GovernTokenBalance[0].value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' Troika';
					if (UserPush[0].length == 0) {
						document.getElementById("UserLastPush").innerHTML = 'Your Actual Push : 0.0 Troika';
					}
					else{
						document.getElementById("UserLastPush").innerHTML = 'Your Actual Push : '+Math.trunc((UserPush[0].value/100000000) * Math.pow(10, 2)) / Math.pow(10, 2)+' Troika';
					}						
				}	
														
					
			});				
		// Timer for Reward Retrieve
		$.when(
			$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+"/PrizeHeight"),  
			$.getJSON("https://nodes.wavesplatform.com/blocks/height"),
			$.getJSON("https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/Delay"),
			$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/HighestPushAddress')
			).done(function (FundBoxHeight,HeightBlockch,delayblock, HighestPushAddress) {	

					if (FundBoxHeight[0].value == 0 ) {																	
						if (HighestPushAddress[0].value == Address) {
							document.getElementById("Rewarding").innerHTML = '<h1>Waiting for Reward to be received <br> Your Push is actually the highest, if reward is released you would be the winner</h1>'
						}else{
							document.getElementById("Rewarding").innerHTML = '<h1>Waiting for Reward to be received</h1>'	
						}
						
						$.when(							      	      											
							$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_APY'),
							$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastWinner'),
							$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastPrize')
							).done(function (UserAPY,LastWinner,LastPrize) {							
								document.getElementById("ClaimRewardButton").innerHTML ='Your APY : '+UserAPY[0].value+' % <p> Last winner: '+LastWinner[0].value.slice(0,4)+'..'+LastWinner[0].value.slice(-4)+'</p><p> Last reward: '+LastPrize[0].value/100000000+'</p>'								
							})
						
					}
					else{									
						r = HeightBlockch[0].height-(FundBoxHeight[0].value + delayblock[0].value)
						if (r < 0) {		
							
							Day = Math.trunc(-r/1440)
							Hours = Math.trunc( (-r-1440*Day)/60 )
							Minutes = Math.trunc(-r-1440*Day-60*Hours)

							if ( Day < 10) Days ='0'+ Day; else Days = Day			
							if (Hours < 10) Hours ='0'+Hours; else Hours = Hours
							if (Minutes < 10) Minutes = '0'+Minutes; else Minutes =  Minutes
							
							if (HighestPushAddress[0].value == Address) {
								document.getElementById("Rewarding").innerHTML = '<h1>'+Days+' Days '+Hours+' Hours '+ Minutes+' minutes before reward is released</h1> <br> Your Push is actually the highest, if reward is released you would be the winner'
							}else{
							
								document.getElementById("Rewarding").innerHTML = '<h1>'+Days+' Days '+Hours+' Hours '+ Minutes+' minutes before reward is released</h1>User '+HighestPushAddress[0].value.substring(0,4)+'...'+HighestPushAddress[0].value.slice(-4)+' has the highest Push for reward right now'
							}
							$.when(							      	      											
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_APY'),
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastWinner'),
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastPrize')
								).done(function (UserAPY,LastWinner,LastPrize) {
								
									document.getElementById("ClaimRewardButton").innerHTML ='Your APY : '+UserAPY[0].value+' % <p> Last winner: '+LastWinner[0].value.slice(0,4)+'..'+LastWinner[0].value.slice(-4)+'</p><p> Last reward: '+LastPrize[0].value/100000000+'</p>'
									
								})
						}							
						else{
							// Check if User is winner and withdraw in case he is	
							$.when(							      	      
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/HighestPushAddress'),
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/FundBox'),
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_Push'),								
								$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/HighestPush'),
								$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+"/PrizeHeight"),  
								$.getJSON("https://nodes.wavesplatform.com/blocks/height"),
								$.getJSON("https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/Delay"),								
								).done(function (HighestPushAddress,PrizeAmount,UserGovernToken,TroikaLastPush,PrizeHeight,HeightBlockch,Delayblock) {
									console.log('HighestPushAddress: ',HighestPushAddress[0].value)						
									console.log(PrizeAmount[0].value)
									console.log('TroikaLastPush',TroikaLastPush[0].value)
									//console.log(Address)
							
									if (( HighestPushAddress[0].value == Address) && (PrizeAmount[0].value > 0) && (UserGovernToken[0].value >= TroikaLastPush[0].value) )  {									
										// Show Retrieve reward GUI
										RetrieveCountDown = (PrizeHeight[0].value+Delayblock[0].value-HeightBlockch[0].height)
										console.log('CountDown: ', RetrieveCountDown)
										console.log('PrizeHeight[0].value+Delayblock[0].value: ', PrizeHeight[0].value+Delayblock[0].value)
										console.log('Height: ', HeightBlockch[0].height)
										if (RetrieveCountDown < 0) {
											console.log("Countdown: ", RetrieveCountDown)
											Days  =  Math.trunc(-RetrieveCountDown/1440)
											Hours =  Math.trunc((-RetrieveCountDown-Days*1440)/60)
											Min   =  Math.trunc(-RetrieveCountDown-Hours*60-Days*1440)
											document.getElementById("Rewarding").innerHTML = '<h1>Congratulations ! <br>Your push was the highest, and you won the reward prize <h1> <p> <h3> You have '+Days+' Day '+Hours+' H ' +Min+' min to withdraw the reward otherwise it will be re-played again ! <h3>'																						
											document.getElementById("ClaimRewardButton").innerHTML ='<p id="WithdrawStakeButton" ><button class="round light" onclick="RetrieveReward()">Claim reward now</button></p>'+
											'</div>'
										}
										else{
											$.when(							      	      											
												$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_APY'),
												$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastWinner'),
												$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastPrize')
												).done(function (UserAPY,LastWinner,LastPrize) {							
													document.getElementById("ClaimRewardButton").innerHTML ='Your APY : '+UserAPY[0].value+' % <p> Last winner: '+LastWinner[0].value.slice(0,4)+'..'+LastWinner[0].value.slice(-4)+'</p><p> Last reward: '+LastPrize[0].value/100000000+'</p>'								
												})											
											document.getElementById("Rewarding").innerHTML = '<h1> Reward is available for pushing again, try your chance and push higher than the last higher push<h1>'
										}							
						
									} else {
										
										if (HighestPushAddress[0].value  == "" )
											document.getElementById("Rewarding").innerHTML = '<h1>Prize Unlocked ! <p>Waiting for Users to Push, be the first to push for the reward  </p> <h1>'

										if (HighestPushAddress[0].value  != "" && (PrizeAmount[0].value > 0) )											
											RetrieveCountDown = (PrizeHeight[0].value+Delayblock[0].value-HeightBlockch[0].height)
											if (RetrieveCountDown < 0){
												console.log("Countdown: ", RetrieveCountDown)
												Days  =  Math.trunc(-RetrieveCountDown/1440)
												Hours =  Math.trunc((-RetrieveCountDown-Days*1440)/60)
												Min   =  Math.trunc(-RetrieveCountDown-Hours*60-Days*1440)
												document.getElementById("Rewarding").innerHTML = '<h1>Prize awarded ! <h1><p><h2> User push  '+HighestPushAddress[0].value.slice(0,4)+'..'+HighestPushAddress[0].value.slice(-4)+
											                                                 ' was the highest </p><p> Winner has '+Days+' Day '+Hours+' H ' +Min+' min to withdraw Reward, After that and if Reward is not withdrawn, Users can Push again for the same reward</p> <h2>'
											}
											else{
												$.when(							      	      											
													$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_APY'),
													$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastWinner'),
													$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastPrize')
													).done(function (UserAPY,LastWinner,LastPrize) {							
														document.getElementById("ClaimRewardButton").innerHTML ='Your APY : '+UserAPY[0].value+' % <p> Last winner: '+LastWinner[0].value.slice(0,4)+'..'+LastWinner[0].value.slice(-4)+'</p><p> Last reward: '+LastPrize[0].value/100000000+'</p>'								
													})
												document.getElementById("Rewarding").innerHTML = '<h1> Reward is available for pushing again, try your chance and push higher than the last higher push<h1>'
											}																							 
										$.when(							      	      											
											$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/'+Address+'_APY'),
											$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastWinner'),
											$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/LastPrize'),
											).done(function (UserAPY,LastWinner,LastPrize) {
											
												document.getElementById("ClaimRewardButton").innerHTML ='Your APY : '+UserAPY[0].value+' % <p> Last winner: '+LastWinner[0].value.slice(0,4)+'..'+LastWinner[0].value.slice(-4)+'</p><p> Last reward: '+LastPrize[0].value/100000000+'</p>'
											})
		
									}									
								});	
							}
					}					
						
				});
	
						     		
}

function toggle_menu() {
    const menu_btn = document.getElementById("menu-btn"),
        menu = document.getElementById("menu");
    if (menu.hasAttribute("hidden")) {
        menu_btn.querySelector("img").src = "icons/cross.svg";
        menu.removeAttribute("hidden");
        menu.animate({
            transform: ['translateY(-100%)', 'translateY(0)']
        }, {
            duration: 300,
            fill: 'forwards'
        });
    } else {
        menu_btn.querySelector("img").src = "icons/menu.svg";
        menu.animate({
            transform: ['translateY(0)', 'translateY(-100%)']
        }, {
            duration: 300,
            fill: 'forwards'
        });
        setTimeout(() => menu.setAttribute("hidden", ""), 300);
    }
}

var last_form;

function revealForm(form) {
    if (last_form) {
        last_form.scrollIntoView({
            block: "center"
        });
        last_form.animate({
            opacity: [1, 0]
        }, {
            duration: 500,
            fill: "forwards"
        });
        setTimeout(() => last_form.setAttribute("hidden", ""), 500);
    }
    setTimeout(() => {
        last_form = document.getElementById(form);
        last_form.removeAttribute("hidden");
        last_form.scrollIntoView({
            block: "center"
        });
        last_form.animate({
            opacity: [0, 1]
        }, {
            duration: 1000,
            fill: "forwards"
        });

    }, last_form ? 500 : 100); 
}

function RetrieveReward(){
    
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens":  "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
			      call: {
			      		function: 'ClaimPrize',
			      		args: []
			      	}, payment: []
			 }
		   }).then((tx) => {
			document.getElementById("RetrieveReward").innerHTML = ''		
			document.getElementById("Rewarding").innerHTML = ''	
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'Your Transaction has been sent: Retrieve Reward',
			  showConfirmButton: false,
			  timer: 3000
			})				 		 			 			 
		   }).catch((error) => {
			 Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.data ,
				  footer: ''
				})
		   });	
	})	        
    return false;
};	  		     


function StakeTokens(){
			
document.getElementById('stake-form').onsubmit = function() { 
    
    StakeAmount = document.getElementById('StakeAmount').value
    // Staking Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens":  "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
			      call: {
			      		function: 'Stake',
			      		args: []
			      	}, payment: [{assetId: "EbLVSrAi6vS3AkLwBinzZCvAXP2yYiFJEzj1MBVHcwZ5", tokens: StakeAmount}]
			 }
		   }).then((tx) => {
			
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'Your Transaction has been sent Staking '+StakeAmount+' ASIMI',
			  showConfirmButton: false,
			  timer: 3000
			})				 		 			 			 
		   }).catch((error) => {
			 Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.data ,
				  footer: ''
				})
		   });	
	})			    
    return false;
};

	  		       
} 

function WithdrawStakeTokens(){
			
document.getElementById('withdraw-form').onsubmit = function() { 
    
    WithdrawAmount = document.getElementById('WithdrawAmount').value
    // Staking Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens":  "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
			      call: {
			      		function: 'WithdrawStakedFunds',
			      		args: [ {
			      		      "type": "integer",
			      		      "value": WithdrawAmount*100000000
			      		    }]
			      	}, payment: []
			 }
		   }).then((tx) => {
			
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'Your Transaction has been sent: Withdraw '+WithdrawAmount+' ASIMI',
			  showConfirmButton: false,
			  timer: 3000
			})				 		 			 			 
		   }).catch((error) => {
			 Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.data ,
				  footer: ''
				})
		   });	
	})	    
    return false;
};	  		       
} 


function DepositGovernTokens(){
			
document.getElementById('deposit-form').onsubmit = function() { 
    
    DespoitTroika = document.getElementById('DespoitTroika').value
    // Staking Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens":  "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
			      call: {
			      		function: 'DepositGovernToken',
			      		args: []
			      	}, payment: [{assetId: "DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP", tokens: DespoitTroika}]
			 }
		   }).then((tx) => {
			
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'Your Transaction has been sent: Deposit '+DespoitTroika+' TROIKA',
			  showConfirmButton: false,
			  timer: 3000
			})
				 		 			 
			 
		   }).catch((error) => {
			 Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.data ,
				  footer: ''
				})
		   });	
	})	        
    return false;
};	  		       
} 

function HarvestGovernToiken(){
			
document.getElementById('withdraw-troika-form').onsubmit = function() { 
    
    HarvestTroika = document.getElementById('HarvestTroika').value
    // Harvest Earned Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens":  "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
			      call: {
			      		function: 'HarvestGovernToiken',
			      		args: [ {
			      		      "type": "integer",
			      		      "value": HarvestTroika*100000000
			      		    }]
			      	}, payment: []
			 }
		   }).then((tx) => {
			
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'Your Transaction has been sent: Withdraw '+HarvestTroika+' TROIKA',
			  showConfirmButton: false,
			  timer: 3000
			})
				 		 			 			 
		   }).catch((error) => {
			 Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: error.data ,
				  footer: ''
				})
		   });	
	})	    
    return false;
};  		       
} 

function UnlockMyWallet(){   
   if (typeof Waves !== 'undefined') {	
   const authData = { data: "Welcome to TroikaNdApp" };
    WavesKeeper.auth(authData)
	 .then(auth => {
	     			     
	     //Show Buttons for SmartContract Actions
	     setTimeout(() => {
	     		document.getElementById("StakeButton").removeAttribute("hidden");
	     		document.getElementById("WithdrawStakeButton").removeAttribute("hidden");	     		
				document.getElementById("WithdrawGovernButton").removeAttribute("hidden");
				
		 })
	     // Change Unlock Button Text		     
	     setTimeout(() => {
			document.getElementById("UnlockWallet").hidden = true;	  
			document.getElementById("UtilityUse").innerHTML = '<button class="round dark" onclick="PushReward()" id="PushReward">Push for Reward</button> '+
															  ' <button class="round dark" onclick="DelayReward()" id="DelayReward">Postpone the Reward Release</button>'		       
			document.getElementById("WalletInfo").innerHTML = 
			'<button class="round dark" >  '+auth.address.substring(0,4)+'...'+auth.address.slice(-4)+'</button>';	
		})			 
	     /*Update UserBalace Txt*/
	     const nodeUrl = 'https://nodes.wavesplatform.com';
	     let StakedToken = "EbLVSrAi6vS3AkLwBinzZCvAXP2yYiFJEzj1MBVHcwZ5"
	     let GovernToken = "DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP"
		 let dAppAddress = "3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE"
		 
		 var interval = setInterval(function () { UpdateBalance(dAppAddress,auth.address,StakedToken,GovernToken); }, 3000);
	     		 
			   			
		}).catch(error => {
			
			/*...processing errors: Show here error message: */
			/* "Ups Something went wrong with your authentication, please check your Wallet data" */
		})
   } else {
       
       Swal.fire({
	  icon: 'error',
	  title: 'Oops...',
	  text: 'Could not find WavesKeeper, Please install the extension for your browser',
	  footer: '<a href>Why do I have this issue?</a>'
	})	       
    }	 
}            

function PushReward(){
	Swal.fire({
		title: "Push for the reward!",
		text: "To be able to claim the reward you have to deposit a higher amount of Troikas than the last higest push:",
		input: 'text',
		showCancelButton: true        
	}).then((result) => {
		if (result.value) {
			WavesKeeper.signAndPublishTransaction({
				type: 16,
				data: {
					 fee: {
					  "tokens":  "0.05",
					  "assetId": "WAVES"
					 },
					 dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
					 call: {
							 function: 'PushReward',
							 args: []
						 }, payment: [{assetId: "DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP", tokens: result.value}]
				}
			  }).then((tx) => {
			   
			   Swal.fire({
				 position: 'center',
				 icon: 'success',
				 title: 'Your Transaction has been sent: Pushing for reward with '+result.value+' TROIKA',
				 showConfirmButton: false,
				 timer: 3000
			   })
										  
				
			  }).catch((error) => {
				Swal.fire({
					 icon: 'error',
					 title: 'Oops...',
					 text: error.data ,
					 footer: ''
				   })
			  });	
		}
	});
};




function DelayReward(){

	$.getJSON('https://nodes.wavesplatform.com/addresses/data/3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE/DelayCost',  
	function (DelayCost) {						
		 if (DelayCost.length == 0) {
			 DelayTokenCost = 10
		} 
		else {
			if (DelayCost.value == 0 ) 
				DelayTokenCost = 10
			else 
			 	DelayTokenCost = 2*(DelayCost.value)/100000000

			Swal.fire({
				title: "Postpone the release of the reward!",
				text: "You will delay the release of the pending or next reward ONE DAY later",
				input: 'text',
				inputValue: DelayTokenCost,
				showCancelButton: true        
			}).then((result) => {
				if (result.value) {
					WavesKeeper.signAndPublishTransaction({
						type: 16,
						data: {
							 fee: {
							  "tokens":  "0.05",
							  "assetId": "WAVES"
							 },
							 dApp: '3PMf35RXPcJWV7uSmaTMHk8PbEaJyBfsaYE',
							 call: {
									 function: 'delayprize',
									 args: []
								 }, payment: [{assetId: "DHZVHe6JzD61zTwH4ZnHnmo3w7oKGABXwgBt4S8KkzUP", tokens: result.value}]
						}
					  }).then((tx) => {
					   
					   Swal.fire({
						 position: 'center',
						 icon: 'success',
						 title: 'Your Transaction has been sent: Postpone One day the release of reward <br>Cost '+result.value+' TROIKA',
						 showConfirmButton: false,
						 timer: 3000
					   })
												  
						
					  }).catch((error) => {
						Swal.fire({
							 icon: 'error',
							 title: 'Oops...',
							 text: error.data ,
							 footer: ''
						   })
					  });	
				}
			});
		}
	});	
};
