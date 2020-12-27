// Staked Tokens the Smart Contract
const nodeUrl = 'https://nodes-testnet.wavesnodes.com';
let dAppAddress = "3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u"
let StakedToken = "GECLRH2fx2Xxix5gmrGV92AMt1A9LPohRpqwqRE16mwr"
let FundBox     = "3MsH5Hr1qQYUnwq4HTpiaGpXQi6cGPUsa5n"
let GovernToken = "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P"

// Smart Contract Balance
// ..................
function UpdateBalanceContract (){
	$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'?matches='+FundBox+'_'+StakedToken,  
	function (Reward) {
			if (Reward.length == 0) {
				document.getElementById("ContractReward").innerHTML = 'Reward Available: 0.0 ASIMI';
			}
			else{
				document.getElementById("ContractReward").innerHTML = 'Reward Available: '+Reward[0].value+' ASIMI';
			}
		});	

	// Smart Contract Balance Staked
	$.getJSON(nodeUrl+'/assets/balance/'+dAppAddress+'/'+StakedToken,
	function (result) {
			if (result.length == 0) {
				document.getElementById("ContractStaked").innerHTML = 'Staked: 0.0 ASIMI';
			}	
			else{
				document.getElementById("ContractStaked").innerHTML = 'Staked: '+result.balance+' ASIMI';
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
					document.getElementById("Auction").innerHTML = 'Last Push: '+AuctionReward.value+' TROIKA';				
					
				}
			});	
}

var interval = setInterval(function () { UpdateBalanceContract(); }, 10000);

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
		// Govern Token Balance of the User's Wallet
		$.getJSON(nodeUrl+'/assets/balance/'+Address+'/'+GovernToken,  
		function (result) {
			if (result.length == 0) {
				document.getElementById("UserWalletGovernBalance").innerHTML = 'Balance Wallet: 0.0 Troika';
			}else{
				document.getElementById("UserWalletGovernBalance").innerHTML = 'Balance Wallet: '+result.balance+' Troika';
			}
				
		});

		// Stake Token Balance of the User's in Smart Contract
		$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'?matches='+Address+'_'+StakedToken,  
		function (Stakedbalance) {						
			 if (Stakedbalance.length == 0) {
				document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: 0.0 ASIMI';
			} 
			else {
				document.getElementById("UserBalanceStakeSmartContract").innerHTML = 'Staked in Contract: '+Stakedbalance[0].value+' ASIMI';
			}
				
		});	

		// Govern Token Balance of the User's in Smart Contract
		$.getJSON(nodeUrl+'/addresses/data/'+dAppAddress+'?matches='+Address+'_'+GovernToken,  
		function (GovernTokenBalance) {	
			 if (GovernTokenBalance.length == 0) {
				 document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : 0.0 Troika';
			 }
			 else{
				 document.getElementById("UserBalanceGovernSmartContract").innerHTML = 'Earned : '+GovernTokenBalance[0].value+' Troika';
			 }								
				
		});	
			console.log("Test Here....: https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/3MsH5Hr1qQYUnwq4HTpiaGpXQi6cGPUsa5n_PrizeHeight")
		// Timer for Reward Retrieve
		$.when(
			$.getJSON("https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/3MsH5Hr1qQYUnwq4HTpiaGpXQi6cGPUsa5n_PrizeHeight"),  
			$.getJSON("https://nodes-testnet.wavesnodes.com/blocks/height")
			).done(function (FundBoxHeight,HeightBlockch) {	
					if (FundBoxHeight.length == 0) {
						console.log("Height SHIT: ", FundBoxHeight[0].value)
						document.getElementById("Rewarding").innerHTML = 'Remnaining : 0.0 Troika';
					}
					else{
						console.log("Height miaw: ", FundBoxHeight[0])	
						console.log("tooozzz;: ", HeightBlockch)			
						document.getElementById("Rewarding").innerHTML = '<h1>Remnaining : '+FundBoxHeight.value+'....'+HeightBlockch+'</h1>';
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
	     // Change Unlock Button Text		     
	     setTimeout(() => {
  		       document.getElementById("UnlockWallet").hidden = true;	  		       
	     		document.getElementById("WalletInfo").innerHTML = 
	     		'<button class="round dark" >  '+auth.address.substring(0,4)+'...'+auth.address.slice(-4)+'</button>';	
	     })		     			     
	     //Show Buttons for SmartContract Actions
	     setTimeout(() => {
	     		document.getElementById("StakeButton").removeAttribute("hidden");
	     		document.getElementById("WithdrawStakeButton").removeAttribute("hidden");
	     		document.getElementById("DepositGovernButton").removeAttribute("hidden");
	     		document.getElementById("WithdrawGovernButton").removeAttribute("hidden");
	     })
	     /*Update UserBalace Txt*/
	     const nodeUrl = 'https://nodes-testnet.wavesnodes.com';
	     let StakedToken = "GECLRH2fx2Xxix5gmrGV92AMt1A9LPohRpqwqRE16mwr"
	     let GovernToken = "2FMrxDLdQhauSY7d1uDUyKP1MpxkM7BeWA2UMnk3cG3P"
		 let dAppAddress = "3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u"
		 
		 var interval = setInterval(function () { UpdateBalance(dAppAddress,auth.address,StakedToken,GovernToken); }, 10000);
	     		 
	      // Check if User is winner and withdraw in case he is	      	      
		      $.getJSON('https://nodes-testnet.wavesnodes.com/addresses/data/3N9eE86dXUm7rfc2WWCMLHkaEM4Y8yoNj7u/MaxGovernTokenDepositerKey',
				function (result) {						
					if (result.value == auth.address+'_'+ GovernToken)  {
						// Show Retrieve reward GUI
						document.getElementById("RetrieveReward").innerHTML ='<div class="fund-item" ><img draggable="false" src="icons/tag.svg" /><h2>Claim reward !</h2>'+						
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
					}									
				});				   			
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