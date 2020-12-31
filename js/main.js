// Staked Tokens the Smart Contract
const nodeUrl = 'https://nodes-testnet.wavesnodes.com';
let dAppAddress = "3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u"
let StakedToken = "GECLRH2fx2Xxix5gmrGV92AMt1A9LPohRpqwqRE16mwr"
let FundBox     = "3MsH5Hr1qQYUnwq4HTpiaGpXQi6cGPUsa5n"
let GovernToken = "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P"


// Smart Contract Balance
function UpdateBalanceContract (){
	$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/FundBox',  
	function (Reward) {
			if (Reward.length == 0) {
				document.getElementById("ContractReward").innerHTML = 'Reward Available: 0.0 ASIMI';
			}
			else{
				document.getElementById("ContractReward").innerHTML = 'Reward Available: '+Reward.value+' ASIMI';
			}
		});	

	// Smart Contract Balance Staked
	$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'/StakeBalance',
	function (result) {
		
			if (result.length == 0) {
				document.getElementById("ContractStaked").innerHTML = 'Staked: 0.0 ASIMI';
			}	
			else{
				document.getElementById("ContractStaked").innerHTML = 'Staked: '+result.value+' ASIMI';
			}
			
			
		});
		
		// Smart Contract Balance
		// ..................
		$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/GovernTokenMaxDeposit',  
		function (AuctionReward) {
			
				if (AuctionReward.value == 0) {
					document.getElementById("Auction").innerHTML = 'No Push';
				}
				else{
					document.getElementById("Auction").innerHTML = 'Highest Push: '+AuctionReward.value+' TROIKA';				
					
				}
			});	
}

var interval = setInterval(function () { UpdateBalanceContract(); }, 3000);

function UpdateBalance(dAppAddress,Address,StakedToken,GovernToken){	

		// Stake Token Balance of the User's Wallet
			$.getJSON(nodeUrl+'/assets/balance/'+Address+'/'+StakedToken,  
			function (result) {
				if (result.length == 0) {
					document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: 0.0 ASIMI'
				}else{
					document.getElementById("UserWalletStakeBalance").innerHTML = 'Balance Wallet: '+result.balance;+' ASIMI'
				}

			});		


		// Stake Token Balance of the User's in Smart Contract
		$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'?matches='+Address+'_Staking',  
		function (Stakedbalance) {						
			 if (Stakedbalance.length == 0) {
				document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: 0.0 ASIMI';
			} 
			else {
				document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: '+Stakedbalance[0].value+' ASIMI';
			}
				
		});	

		// Govern Token Balance of the User's in Smart Contract
		$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/'+Address+'_Earnings',    
		function (GovernTokenBalance) {				
			 if (GovernTokenBalance.length == 0) {
				 document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : 0.0 Troika';
			 }
			 else{
				 document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : '+GovernTokenBalance.value+' Troika';
			 }								
				
		});				
		// Timer for Reward Retrieve
		$.when(
			$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+"/PrizeHeight"),  
			$.getJSON("https://nodes-testnet.wavesnodes.com/blocks/height"),
			$.getJSON("https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/Delay"),
			$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/MaxGovernTokenDepositerKey')
			).done(function (FundBoxHeight,HeightBlockch,delayblock, HighestPushAddress) {	

					if (FundBoxHeight[0].value == 0 ) {
							
						//document.getElementById("Rewarding").innerHTML = 'Waiting for Reward to be received'					
						if (HighestPushAddress[0].value == Address+"_Push") {
							document.getElementById("Rewarding").innerHTML = 'No Reward available for now <br> Your Push is actually the highest, if reward is released you would be the winner'
						}else{
							document.getElementById("Rewarding").innerHTML = 'No Reward available for now'	
						}
						
					}
					else{									
						r = HeightBlockch[0].height-(FundBoxHeight[0].value + delayblock[0].value)
						if (r < 0) {
							console.log("Math.trunc(-r/60 ) ", Math.trunc(-r/60 ))
							console.log("-r-Math.trunc(-r/60 ) ",-r-Math.trunc(-r/60 ))
							if (HighestPushAddress[0].value == Address+"_Push") {
								document.getElementById("Rewarding").innerHTML = Math.trunc(-r/60 )+'<h1>Hours'+ -r-Math.trunc(-r/60 )+'minutes before reward is released</h1> <br> Your Push is actually the highest, if reward is released you would be the winner'
							}else{
								document.getElementById("Rewarding").innerHTML = Math.trunc(-r/60 )+'<h1>Hours'+ -r-Math.trunc(-r/60 )+'minutes before reward is released</h1> minutes before reward is released '	
							}
						}
							
						else{
							// Check if User is winner and withdraw in case he is	
						$.when(							      	      
							$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/MaxGovernTokenDepositerKey'),
							$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/FundBox'),
							$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/'+Address+'_Push'),
							$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/GovernTokenMaxDeposit')
							).done(function (result,PrizeAmount,UserGovernToken,TroikaLastPush) {
								console.log("CHECK:  ", result[0].value)
								console.log("UserGovernToken:  ", UserGovernToken)
								console.log("PrizeAmount[0].value:  ", PrizeAmount[0].value)
								
								if (( result[0].value == Address+'_Push') && (PrizeAmount[0].value > 0) && (UserGovernToken[0].value >= TroikaLastPush[0].value) ) {
									// Show Retrieve reward GUI
									document.getElementById("Rewarding").innerHTML = '<h1>Congratulations ! <br>You push was the highest, and you won the reward prize <h1>'																						
									document.getElementById("RetrieveReward").innerHTML ='<div class="fund-item" id ="RetrieveReward"><img draggable="false" src="icons/tag.svg" /><h2>Claim reward !</h2>'+						
									'<p id="WithdrawStakeButton" ><button class="round light" onclick="RetrieveReward()">Claim reward now</button></p>'+
									'</div>'
									// Managing Retrieve Reward
									Swal.fire({
									title: 'Congrats ! You won the reward',
									text: "Do you wish to retrieve the reward to your wallet ? \n Please consider that your balance of deposited Troika in the Contract will be reinitalized to 0 Troika. \n Hence, if you want to keep a part of the earned Troika before claiming the rewrad proceed to withdraw the Troika you do not need to claim the reward. ",
									icon: 'warning',
									showCancelButton: true,
									confirmButtonColor: '#3085d6',
									cancelButtonColor: '#d33',
									confirmButtonText: 'Yes, Withdraw reward now!'
									}).then((result) => {
									if (result.isConfirmed) {				
										RetrieveReward()
									}
									})														
								//document.getElementById("Rewarding").innerHTML = '<button class="round dark" onclick="RetrieveReward()" >Retrieve Reward</button>'
								} else {
									console.log('NO WINNER')	
									document.getElementById("RetrieveReward").innerHTML =''		
									document.getElementById("Rewarding").innerHTML =''		
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
    // Harvest Troika Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens": "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
			      call: {
			      		function: 'ClaimPrize',
			      		args: []
			      	}, payment: []
			 }
		   }).then((tx) => {
			
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
				   "tokens": "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
			      call: {
			      		function: 'Stake',
			      		args: []
			      	}, payment: [{assetId: "GECLRH2fx2Xxix5gmrGV92AMt1A9LPohRpqwqRE16mwr", tokens: StakeAmount}]
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
				   "tokens": "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
			      call: {
			      		function: 'WithdrawStakedFunds',
			      		args: [ {
			      		      "type": "integer",
			      		      "value": WithdrawAmount
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
				   "tokens": "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
			      call: {
			      		function: 'DepositGovernToken',
			      		args: []
			      	}, payment: [{assetId: "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P", tokens: DespoitTroika}]
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
    // Staking Transaction
    setTimeout(() => {
		     WavesKeeper.signAndPublishTransaction({
			 type: 16,
			 data: {
			      fee: {
				   "tokens": "0.05",
				   "assetId": "WAVES"
			      },
			      dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
			      call: {
			      		function: 'HarvestGovernToiken',
			      		args: [ {
			      		      "type": "integer",
			      		      "value": HarvestTroika
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
	     const nodeUrl = 'https://nodes-testnet.wavesnodes.com';
	     let StakedToken = "GECLRH2fx2Xxix5gmrGV92AMt1A9LPohRpqwqRE16mwr"
	     let GovernToken = "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P"
		 let dAppAddress = "3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u"
		 
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
					  "tokens": "0.05",
					  "assetId": "WAVES"
					 },
					 dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
					 call: {
							 function: 'PushReward',
							 args: []
						 }, payment: [{assetId: "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P", tokens: result.value}]
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

	$.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/DelayCost',  
	function (DelayCost) {						
		 if (DelayCost.length == 0) {
			DelayTokenCost = 10
		} 
		else {
			if (DelayCost.value == 0 ) 
				DelayTokenCost = 10
			else 
			 	DelayTokenCost = 2*(DelayCost.value)

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
							  "tokens": "0.05",
							  "assetId": "WAVES"
							 },
							 dApp: '3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u',
							 call: {
									 function: 'delayprize',
									 args: []
								 }, payment: [{assetId: "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P", tokens: result.value}]
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