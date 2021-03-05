import sys

from django.conf import settings
from django.conf.urls import url
from django.core.management import execute_from_command_line
from django.http import HttpResponse, JsonResponse

import os
import json

PROJECT_PATH = os.path.realpath(os.path.dirname(__file__))


settings.configure(
    DEBUG=True,
    ROOT_URLCONF=sys.modules[__name__],
)

content_api_file = os.path.join(PROJECT_PATH + '/content_api.json')
with open(content_api_file, "r") as f:
    content_data = json.load(f)


def content(request):
    tag_filter = request.GET.get('tag')
    articles = content_data['results']
    if tag_filter:
        filtered_articles = []
        for article in articles:
            for tag in article['tags']:
                if tag['slug'] == tag_filter:
                    filtered_articles.append(article)
        articles = filtered_articles
    return JsonResponse(data={'results': articles, 'count': len(articles)})


urlpatterns = [
    url('content', content),
]


if __name__ == '__main__':
    execute_from_command_line(sys.argv)
