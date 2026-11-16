{% assign is_zh = false %}
{% if page.lang == 'zh-CN' %}
  {% assign is_zh = true %}
{% endif %}

<div class="page-heading">
  <h2 id="services">{% if is_zh %}学术服务{% else %}Academic Service{% endif %}</h2>
</div>

<h3 class="section-heading" id="memberships">{% if is_zh %}学会会员{% else %}Professional Memberships{% endif %}</h3>
<ul class="service-grid" aria-labelledby="memberships" role="list">
  <li class="site-card service-membership">
    <strong>ASCE</strong>
    <span>{% if is_zh %}美国土木工程师学会{% else %}American Society of Civil Engineers{% endif %}</span>
    <span class="service-meta">{% if is_zh %}会员{% else %}Member{% endif %} · M.ASCE</span>
  </li>
  <li class="site-card service-membership">
    <strong>ITE</strong>
    <span>{% if is_zh %}交通工程师协会{% else %}Institute of Transportation Engineers{% endif %}</span>
    <span class="service-meta">{% if is_zh %}学生会员{% else %}Student member{% endif %}</span>
  </li>
  <li class="site-card service-membership">
    <strong>IACIP</strong>
    <span>{% if is_zh %}国际华人基础设施工作者协会{% else %}International Association of Chinese Infrastructure Professionals{% endif %}</span>
    <span class="service-meta">{% if is_zh %}学生会员{% else %}Student member{% endif %}</span>
  </li>
</ul>

<h3 class="section-heading" id="peer-review">{% if is_zh %}期刊审稿{% else %}Journal Peer Review{% endif %}</h3>

<ul class="service-grid service-journal-grid" aria-labelledby="peer-review" role="list">
{% for journal in site.data.services.journals %}
  <li>
    <a class="service-journal" href="{{ journal.url }}"{% if is_zh %} target="_blank" rel="noopener"{% endif %}>
      <span class="service-journal-name">
        <span lang="en">{{ journal.title | escape }}</span>
        {% if is_zh %}<span class="service-meta">{{ journal.title_zh | escape }}</span>{% endif %}
      </span>
    </a>
  </li>
{% endfor %}
</ul>
<p class="service-other-review">{% if is_zh %}其他评审{% else %}Other peer review{% endif %} · <a href="https://www.trb.org/" lang="en">Transportation Research Board (TRB)</a></p>

