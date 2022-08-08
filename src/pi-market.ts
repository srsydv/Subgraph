import {
  BidExecuted as BidExecutedEvent,
  BidOrderReturn as BidOrderReturnEvent,
  TokenMetaReturn as TokenMetaReturnEvent
} from "../generated/piMarket/piMarket"
import {
  BidExecuted,
  BidOrderReturn,
  TokenMetaReturn
} from "../generated/schema"

export function handleBidExecuted(event: BidExecutedEvent): void {
  let entity = new BidExecuted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.price = event.params.price
  entity.save()
}

export function handleBidOrderReturn(event: BidOrderReturnEvent): void {
  let entity = new BidOrderReturn(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.bid_bidId = event.params.bid.bidId
  entity.bid_saleId = event.params.bid.saleId
  entity.bid_sellerAddress = event.params.bid.sellerAddress
  entity.bid_buyerAddress = event.params.bid.buyerAddress
  entity.bid_price = event.params.bid.price
  entity.bid_withdrawn = event.params.bid.withdrawn
  entity.save()
}

export function handleTokenMetaReturn(event: TokenMetaReturnEvent): void {
  let entity = new TokenMetaReturn(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.data_saleId = event.params.data.saleId
  entity.data_tokenContractAddress = event.params.data.tokenContractAddress
  entity.data_tokenId = event.params.data.tokenId
  entity.data_price = event.params.data.price
  entity.data_directSale = event.params.data.directSale
  entity.data_bidSale = event.params.data.bidSale
  entity.data_status = event.params.data.status
  entity.data_bidStartTime = event.params.data.bidStartTime
  entity.data_bidEndTime = event.params.data.bidEndTime
  entity.data_currentOwner = event.params.data.currentOwner
  // entity.id = event.params.id
  entity.save()
}
