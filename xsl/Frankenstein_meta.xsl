<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">

    
    <xsl:template match="tei:TEI">
                     <div class="row">
                         <div class="col">
                             <h4>About the manuscript page:</h4>
                             <xsl:apply-templates select="//tei:sourceDesc"/>
                             <xsl:apply-templates select="//tei:licence"/> <!-- You can change the way the metadata is visualised as well-->
                         </div>
                         <div class="col">
                             <h4>Statistics about this page</h4>
                             <ul>
                                 <li>Total number of modifications: 
                                    <xsl:value-of select="count(//tei:del|//tei:add)" /> 
                                 </li>
                                 <li>Total number of additions: 
                                    <xsl:value-of select="count(//tei:add)" />
                                 </li>
                                 <li>Total number of deletions: 
                                    <xsl:value-of select="count(//tei:del)" />
                                 </li>
                                 <!-- add other list items in which you count things, such as the modifications made by Mary -->
                                 <li>Total modifications by Mary Shelley (additions and deletions):
                                     <xsl:value-of select="count(//tei:del[@hand='#MWS']|//tei:add[@hand='#MWS'])" />
                                 </li>
                                 <!-- add other list items in which you count things, such as the modifications made by Percy -->
                                 <li>Total modifications by Percy Shelley (additions and deletions):
                                     <xsl:value-of select="count(//tei:del[@hand='#PBS']|//tei:add[@hand='#PBS'])" /> 
                                 </li>
                             </ul>
                         </div>
                      </div>
        <hr/>
        
        
    </xsl:template>
 
    <xsl:template match="tei:sourceDesc">
        <div class="metadata-section">
            <p><xsl:value-of select="."/></p>
        </div>
    </xsl:template>
    
    <xsl:template match="tei:licence">
        <div class="metadata-section">
            <p class="italic-text"><xsl:value-of select="tei:p"/></p> 
        </div>
    </xsl:template>

</xsl:stylesheet>
