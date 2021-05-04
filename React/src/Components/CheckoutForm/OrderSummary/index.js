import React from "react";
import "./styles.css";
import useFitText from "use-fit-text";

const OrderSummary = ({
  Prod_Image,
  Prod_Name,
  Prod_Price,
  Prod_Color,
  Prod_Size,
  Quantity,
  Subtotal,
}) => {
  const { fontSize, ref } = useFitText({ maxFontSize: 90 });

  return (
    <table className="orderSummary" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={Prod_Image} alt={Prod_Name} className="orderSummaryImg" />
          </td>
          <td ref={ref} style={{ fontSize, height: 20, width: "14.2857%" }}>
            {Prod_Name}
          </td>
          <td ref={ref} style={{ fontSize, height: 20, width: "14.2857%" }}>
            &#8369; {Prod_Price}
          </td>
          <td ref={ref} style={{ fontSize, height: 20, width: "14.2857%" }}>
            {Prod_Color}
          </td>
          <td ref={ref} style={{ fontSize, height: 20, width: "14.2857%" }}>
            {Prod_Size}
          </td>
          <td ref={ref} style={{ fontSize, height: 20, width: "14.2857%" }}>
            {Quantity}
          </td>
          <td
            className="orderSumSubtotal"
            ref={ref}
            style={{ fontSize, height: 20, width: "14.2857%" }}
          >
            &#8369; {Subtotal.toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderSummary;
