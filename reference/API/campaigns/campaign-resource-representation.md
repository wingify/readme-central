---
title: Campaign resource representation
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Property
      </th>

      <th style={{ textAlign: "left" }}>
        Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Editable
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        id
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign Id
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        name
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign Name
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        type
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign type

        Valid values include `ab`, `multivariate`, `heatmap`, `conversion`, `split`
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        status
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign status
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdOn
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign creation time
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        labels
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        See CampaignLabel resource
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        percentTraffic
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        Percentage traffic allocated to the campaign
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        isCrossDomainEnabled
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Tracking conversions across multiple domains
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdBy
      </td>

      <td style={{ textAlign: "left" }}>
        NestedObject
      </td>

      <td style={{ textAlign: "left" }}>
        Contains the information of user who created the campaign
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdBy.id
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        User Id
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdBy.name
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        User name
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdBy.imageUrl
      </td>

      <td style={{ textAlign: "left" }}>
        link
      </td>

      <td style={{ textAlign: "left" }}>
        User gravatar link
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        urls
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Urls to be included in the campaign
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        urls.\{index}.type
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Url type

        Valid values include `url`,`startsWith`, `endsWith`,`contains`,`pattern`,`regex`
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        urls.\{index}.value
      </td>

      <td style={{ textAlign: "left" }}>
        Link
      </td>

      <td style={{ textAlign: "left" }}>
        Url value
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        excludedUrls
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Urls to be excluded in the campaign
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        excludedUrls.\{index}.type
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        Url type
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        excludedUrls.\{index}.value
      </td>

      <td style={{ textAlign: "left" }}>
        Link
      </td>

      <td style={{ textAlign: "left" }}>
        Url value
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        primaryUrl
      </td>

      <td style={{ textAlign: "left" }}>
        link
      </td>

      <td style={{ textAlign: "left" }}>
        Url on which test needs to be created
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        integrations
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        See integration resource for more details
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        thresholds
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Thresholds for campaign data collection
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        thresholds.winningPercent
      </td>

      <td style={{ textAlign: "left" }}>
        Float
      </td>

      <td style={{ textAlign: "left" }}>
        Threshold for winning variation
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        thresholds.losingPercent
      </td>

      <td style={{ textAlign: "left" }}>
        Float
      </td>

      <td style={{ textAlign: "left" }}>
        Threshold for losing variation
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        thresholds.visitors
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Threshold for number of visitors
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        device
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Device for which the campaign was created
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variations
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        See variation resource for details
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        sections
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        See section resource for details
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        goals
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        See goal resource for details
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Date Range for collected campaign range
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange.intervalSize
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Size of intervals for which data is shown
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange.startTime
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign data start time which is selected
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange.endTime
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign data end time which is selected
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange.limitingStartTime
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign data start time for which overall data is collected
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        dataIntervalRange.limitingEndTime
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign data end time for which overall data is collected
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Campaign data for each variation-goal combination
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.variation
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Variation Id
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.goal
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Goal Id
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Aggregated data for variation-goal combination
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.visitorCount
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        visitor count
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.conversionCount
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        conversion count
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.conversionRate
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        conversion rate
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.standardError
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        standard error
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.totalRevenue
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        total revenue if revenue type goal is selected
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.revenuePerVisitor
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        revenue per visitor
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.revenuePerConversion
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        revenue per conversion
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.revenuePerVisitorStandardError
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        revenue per visitor standard error
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.aggregated.revenuePerConversionStandardError
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        revenue per conversion standard error
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.isLoser
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        if variation-goal combination is loser
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.isWinner
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        if variation-goal combination is winner
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.intervalWise
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Interval wise data for variation-goal combination
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.intervalWise.\{index}.interval
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        interval time
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.intervalWise.\{index}.visitorCount
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        visitor count
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.intervalWise.\{index}.conversionCount
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        conversion count
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variationGoalData.intervalWise.\{index}.totalCount
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        total count
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        stats.conversionRate
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Conversion rate for the campaign (Default :0.05)
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        stats.certaintyMode
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Certainty Modes\
        High Certainty: 0.01\
        Balanced Mode: 0.075\
        Quick Learnings: 0.20 

         (Default : 0.01)
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        stats.expectedMonthlyVisitors
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Monthly expected Visitors on the website whose campaign is created (Default : 300000)
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        stats.expectedRevenuePerVisitor
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Expected Revenue per visitor (Default : 2)
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        stats.liftInConversionRate
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Expected lift in Improvement Rate to be achieved by this campaign\
        (Default : 0.05)
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>
  </tbody>
</Table>
