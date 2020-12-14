import React from "react";
import View from "../View/View";
import Product, { ProductItem } from "../Product/Product";

const ProductsView = () => (
  <View description="cruise producs" title="Compare options">
    <Product
      title="Basic cruise"
      description="The essentials"
      id="product-basic"
    >
      <ProductItem mode="">State Room of Your Choice</ProductItem>
      <ProductItem mode="">24/7 Buffet Dining</ProductItem>
      <ProductItem mode="">Access to Public Areas</ProductItem>
      <ProductItem mode="">Access to Swimming Pools</ProductItem>
      <ProductItem mode="">Broadway Shows</ProductItem>
      <ProductItem mode="">Movie Theater</ProductItem>
      <ProductItem mode="">Kids Lounges and Activities</ProductItem>
      <ProductItem mode="">Access to the Health Club</ProductItem>
      <ProductItem mode="">Free Casino Lessons</ProductItem>
      <ProductItem mode="extra">Shore Excursions</ProductItem>
      <ProductItem mode="extra">Internet Access</ProductItem>
      <ProductItem mode="extra">Fine Dining</ProductItem>
      <ProductItem mode="extra">Food Courts</ProductItem>
      <ProductItem mode="extra">Beverages</ProductItem>
      <ProductItem mode="extra">Casino Games</ProductItem>
      <ProductItem mode="extra">Spa Services</ProductItem>
      <ProductItem mode="extra">Exclusive Decks</ProductItem>
      <ProductItem mode="extra">Exclusive Lounges</ProductItem>
      <ProductItem mode="extra">Exclusive Shows</ProductItem>
      <ProductItem mode="extra">Special Activities</ProductItem>
      <ProductItem mode="no">Return Flights</ProductItem>
      <ProductItem mode="no">Hotel Stay</ProductItem>
      <ProductItem mode="no">Cab Transfers</ProductItem>
    </Product>
    <Product
      title="Cruise bundle"
      description="Save on extras"
      id="product-bundle"
    >
      <ProductItem mode="">State Room of Your Choice</ProductItem>
      <ProductItem mode="">24/7 Buffet Dining</ProductItem>
      <ProductItem mode="">Access to Public Areas</ProductItem>
      <ProductItem mode="">Access to Swimming Pools</ProductItem>
      <ProductItem mode="">Broadway Shows</ProductItem>
      <ProductItem mode="">Movie Theater</ProductItem>
      <ProductItem mode="">Kids Lounges and Activities</ProductItem>
      <ProductItem mode="">Access to the Health Club</ProductItem>
      <ProductItem mode="">Free Casino Lessons</ProductItem>
      <b className="block mt-8 uppercase font-bold">Choose any and save</b>
      <ProductItem mode="save">Shore Excursions</ProductItem>
      <ProductItem mode="save">Internet Access</ProductItem>
      <ProductItem mode="save">Fine Dining</ProductItem>
      <ProductItem mode="save">Food Courts</ProductItem>
      <ProductItem mode="save">Beverages</ProductItem>
      <ProductItem mode="save">Casino Games</ProductItem>
      <ProductItem mode="save">Spa Services</ProductItem>
      <ProductItem mode="save">Exclusive Decks</ProductItem>
      <ProductItem mode="save">Exclusive Lounges</ProductItem>
      <ProductItem mode="save">Exclusive Shows</ProductItem>
      <ProductItem mode="save">Special Activities</ProductItem>
      <ProductItem mode="no">Return Flights</ProductItem>
      <ProductItem mode="no">Hotel Stay</ProductItem>
      <ProductItem mode="no">Cab Transfers</ProductItem>
    </Product>
    <Product
      title="Cruise package"
      description="Complete holiday"
      id="product-package"
    >
      <ProductItem mode="">State Room of Your Choice</ProductItem>
      <ProductItem mode="">24/7 Buffet Dining</ProductItem>
      <ProductItem mode="">Access to Public Areas</ProductItem>
      <ProductItem mode="">Access to Swimming Pools</ProductItem>
      <ProductItem mode="">Broadway Shows</ProductItem>
      <ProductItem mode="">Movie Theater</ProductItem>
      <ProductItem mode="">Kids Lounges and Activities</ProductItem>
      <ProductItem mode="">Access to the Health Club</ProductItem>
      <b className="block mt-8 uppercase font-bold">Choose any and save</b>
      <ProductItem mode="save">Free Casino Lessons</ProductItem>
      <ProductItem mode="save">Shore Excursions</ProductItem>
      <ProductItem mode="save">Internet Access</ProductItem>
      <ProductItem mode="save">Fine Dining</ProductItem>
      <ProductItem mode="save">Food Courts</ProductItem>
      <ProductItem mode="save">Beverages</ProductItem>
      <ProductItem mode="save">Casino Games</ProductItem>
      <ProductItem mode="save">Spa Services</ProductItem>
      <ProductItem mode="save">Exclusive Decks</ProductItem>
      <ProductItem mode="save">Exclusive Lounges</ProductItem>
      <ProductItem mode="save">Exclusive Shows</ProductItem>
      <ProductItem mode="save">Special Activities</ProductItem>
      <ProductItem mode="save">Return Flights</ProductItem>
      <ProductItem mode="save">Hotel Stay</ProductItem>
      <ProductItem mode="save">Cab Transfers</ProductItem>
    </Product>
  </View>
);

export default ProductsView;
